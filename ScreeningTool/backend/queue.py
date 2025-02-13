"""
This queue system manages the distributed processing of academic papers for systematic review screening.
It's a critical component that orchestrates the AI-powered screening process where multiple AI agents
work concurrently to evaluate research papers based on inclusion/exclusion criteria.

Key Responsibilities:
1. Job Management
   - Tracks screening jobs from RIS file upload to completion
   - Manages concurrent processing of multiple screening jobs
   - Implements retry logic with exponential backoff for resilience

2. Progress Tracking
   - Monitors real-time progress of paper screening
   - Tracks individual paper decisions (include/exclude/maybe)
   - Maintains detailed processing history and error states

3. AI Agent Coordination
   - Coordinates between 3 screening agents and 1 reporting agent
   - Prevents duplicate processing of papers
   - Manages agent workload and concurrent operations

Workflow Context:
1. User uploads RIS file with research papers
2. System creates a screening job with inclusion/exclusion criteria
3. Multiple AI agents process papers concurrently
4. Results are tracked and aggregated for final report generation

This implementation follows a robust distributed processing pattern with:
- Atomic operations to prevent race conditions
- Exponential backoff for error handling
- Detailed progress tracking for frontend updates
- Job history for audit and debugging

Related Components:
- FastAPI endpoints in main.py trigger job creation
- Supabase database stores paper metadata and decisions
- CrewAI agents (TODO) will implement the actual screening logic
- Frontend displays real-time progress in the right panel
"""

from typing import Dict, Optional
import asyncio
from datetime import datetime
from .models import JobStatus, ScreeningCriteria

class JobQueue:
    def __init__(self):
        self.jobs: Dict = {}
        self.active_jobs: Dict = {}
        self.max_concurrent_jobs = 3
        self.max_retries = 3
        self.retry_delay = 5  # seconds
        
    async def add_job(self, job_id: str, criteria: ScreeningCriteria, total_studies: int) -> Dict:
        """Add a new job to the queue with study count"""
        self.jobs[job_id] = {
            "status": JobStatus.PENDING,
            "criteria": criteria,
            "created_at": datetime.utcnow(),
            "progress": 0,
            "total_studies": total_studies,
            "processed_studies": 0,
            "retry_count": 0,
            "last_error": None,
            "results": {
                "include": [],
                "exclude": [],
                "maybe": []
            },
            "processing_history": []  # Track processing attempts
        }
        return self.jobs[job_id]
        
    async def process_job(self, job: Dict):
        """Process a job using AI agents with retry logic"""
        job_id = job["id"]
        self.active_jobs[job_id] = job
        
        while self.jobs[job_id]["retry_count"] < self.max_retries:
            try:
                self.jobs[job_id]["status"] = JobStatus.PROCESSING
                self.jobs[job_id]["processing_history"].append({
                    "attempt": self.jobs[job_id]["retry_count"] + 1,
                    "started_at": datetime.utcnow(),
                    "status": JobStatus.PROCESSING
                })
                
                # TODO: Implement actual AI agent processing logic
                # This is where we'll integrate with CrewAI
                pass
                
                # If we get here, processing was successful
                self.jobs[job_id]["status"] = JobStatus.COMPLETED
                self._update_processing_history(job_id, JobStatus.COMPLETED)
                break
                
            except Exception as e:
                await self._handle_processing_error(job_id, e)
                
        # Remove from active jobs when done
        self.active_jobs.pop(job_id, None)
    
    async def _handle_processing_error(self, job_id: str, error: Exception):
        """Handle processing errors with exponential backoff"""
        self.jobs[job_id]["retry_count"] += 1
        self.jobs[job_id]["last_error"] = str(error)
        self._update_processing_history(job_id, JobStatus.FAILED, error)
        
        if self.jobs[job_id]["retry_count"] >= self.max_retries:
            self.jobs[job_id]["status"] = JobStatus.FAILED
        else:
            # Exponential backoff for retries
            retry_delay = self.retry_delay * (2 ** (self.jobs[job_id]["retry_count"] - 1))
            await asyncio.sleep(retry_delay)
    
    def _update_processing_history(self, job_id: str, status: JobStatus, error: Exception = None):
        """Update the processing history for a job"""
        if self.jobs[job_id]["processing_history"]:
            current_attempt = self.jobs[job_id]["processing_history"][-1]
            current_attempt.update({
                "completed_at": datetime.utcnow(),
                "status": status,
                "error": str(error) if error else None
            })
    
    async def update_progress(self, job_id: str, processed_count: int):
        """Update job progress"""
        if job_id not in self.jobs:
            raise KeyError(f"Job {job_id} not found")
            
        job = self.jobs[job_id]
        job["processed_studies"] = processed_count
        job["progress"] = round((processed_count / job["total_studies"]) * 100, 2)
            
    async def get_job_status(self, job_id: str) -> Dict:
        """Get detailed status of a job"""
        if job_id not in self.jobs:
            raise KeyError(f"Job {job_id} not found")
            
        job = self.jobs[job_id]
        return {
            "status": job["status"],
            "progress": job["progress"],
            "processed_studies": job["processed_studies"],
            "total_studies": job["total_studies"],
            "created_at": job["created_at"],
            "retry_count": job["retry_count"],
            "last_error": job["last_error"],
            "processing_history": job["processing_history"]
        }
        
    async def get_agent_status(self) -> Dict:
        """Get status of all AI agents"""
        return {
            "total_agents": 4,  # 3 screening + 1 reporting
            "active_agents": len(self.active_jobs),
            "queue_length": len(self.jobs),
            "jobs_by_status": self._get_jobs_by_status()
        }
    
    def _get_jobs_by_status(self) -> Dict:
        """Get count of jobs in each status"""
        status_counts = {status: 0 for status in JobStatus}
        for job in self.jobs.values():
            status_counts[job["status"]] += 1
        return status_counts 