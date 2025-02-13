"""
Systematic Review Screening API
------------------------------

This FastAPI application implements a multi-agent screening system for systematic reviews.
It follows a distributed processing architecture where multiple AI agents work concurrently
to screen studies based on inclusion/exclusion criteria.

Key Components:
1. Job Queue System
   - Manages screening jobs with unique IDs
   - Tracks job status, progress, and results
   - Handles concurrent processing with multiple agents

2. Database Integration (Supabase)
   - Stores studies with metadata (title, abstract, keywords)
   - Uses atomic transactions for concurrent access
   - Implements row-level locking for safe multi-agent processing

3. AI Agent Architecture
   - 3 Screening Agents: Make include/exclude/maybe decisions
   - 1 Reporting Agent: Aggregates results and generates reports
   - Uses CrewAI for agent orchestration
   - Implements rate limiting and exponential backoff

Processing Flow:
1. User uploads RIS file → validated and stored in database
2. User submits screening criteria → job created and queued
3. Agents claim and process studies atomically
4. Results aggregated and available for download

Performance Considerations:
- Batch processing with configurable sizes
- Row-level locking prevents duplicate processing
- Background tasks for non-blocking operations
- Health monitoring endpoints for system status

Error Handling:
- Validation for RIS files and criteria
- Exception handling with detailed error messages
- Job status tracking with failure states
- Automatic retries for transient failures

This implementation aligns with the requirements in instructions-AI-Agents.txt,
particularly the atomic claim system and concurrent processing capabilities.
"""

from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum
import uuid
import rispy
from datetime import datetime

# Import our custom modules
from .queue import JobQueue
from .models import ScreeningCriteria, JobStatus, StudyMetadata
from .validation import validate_ris_file, validate_criteria
from .database import init_db, get_db


app = FastAPI(
    title="Systematic Review Screening API",
    description="AI-powered screening tool for systematic reviews",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize job queue
job_queue = JobQueue()

@app.on_event("startup")
async def startup_event():
    await init_db()

# Endpoint to upload the RIS file and validate it
# This endpoint is used to upload the RIS file and validate it
@app.post("/api/upload")
async def upload_ris(
    file: UploadFile = File(...),
    background_tasks: BackgroundTasks = BackgroundTasks()
) -> Dict:
    """Upload and validate RIS file"""
    if not file.filename.endswith('.ris'):
        raise HTTPException(400, "Invalid file type. Please upload a RIS file.")
    
    try:
        # Validate RIS file
        file_content = await file.read()
        validated_entries = await validate_ris_file(file_content)
        
        # Generate job ID
        job_id = str(uuid.uuid4())
        
        # Store file data in database
        db = get_db()
        await db.store_ris_entries(job_id, validated_entries)
        
        return {
            "job_id": job_id,
            "message": "File uploaded successfully",
            "study_count": len(validated_entries)
        }
    except Exception as e:
        raise HTTPException(500, f"Error processing file: {str(e)}")

# Endpoint to start the screening process
@app.post("/api/screen/{job_id}")
async def screen_studies(
    job_id: str,
    criteria: ScreeningCriteria,
    background_tasks: BackgroundTasks
) -> Dict:
    """Start the screening process"""
    try:
        # Validate criteria
        await validate_criteria(criteria)
        
        # Add job to queue
        job = await job_queue.add_job(job_id, criteria)
        background_tasks.add_task(job_queue.process_job, job)
        
        return {
            "job_id": job_id,
            "message": "Screening started",
            "status": "processing"
        }
    except Exception as e:
        raise HTTPException(500, f"Error starting screening: {str(e)}")

# Endpoint to get the job status
@app.get("/api/status/{job_id}")
async def get_status(job_id: str) -> Dict:
    """Get detailed job status"""
    try:
        status = await job_queue.get_job_status(job_id)
        return status
    except Exception as e:
        raise HTTPException(404, f"Job not found: {str(e)}")

# Endpoint to download the screening results
@app.get("/api/download/{job_id}")
async def download_results(job_id: str, format: str = "ris") -> Dict:
    """Download screening results"""
    try:
        if format not in ["ris", "excel", "json"]:
            raise HTTPException(400, "Invalid format requested")
            
        result = await job_queue.get_job_results(job_id, format)
        return result
    except Exception as e:
        raise HTTPException(404, f"Results not found: {str(e)}")

# Endpoint: Health check endpoint
@app.get("/api/health")
async def health_check() -> Dict:
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "queue_size": len(job_queue),
        "agent_status": await job_queue.get_agent_status()
    } 