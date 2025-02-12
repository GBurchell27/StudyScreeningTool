from typing import Dict, Optional
import asyncio
from datetime import datetime
from .models import JobStatus, ScreeningCriteria

class JobQueue:
    def __init__(self):
        self.jobs: Dict = {}
        self.active_jobs: Dict = {}
        self.max_concurrent_jobs = 3
        
    async def add_job(self, job_id: str, criteria: ScreeningCriteria) -> Dict:
        """Add a new job to the queue"""
        self.jobs[job_id] = {
            "status": JobStatus.PENDING,
            "criteria": criteria,
            "created_at": datetime.utcnow(),
            "progress": 0,
            "total_studies": 0,
            "processed_studies": 0,
            "results": {
                "include": [],
                "exclude": [],
                "maybe": []
            }
        }
        return self.jobs[job_id]
        
    async def process_job(self, job: Dict):
        """Process a job using AI agents"""
        job_id = job["id"]
        self.jobs[job_id]["status"] = JobStatus.PROCESSING
        
        try:
            # TODO: Implement actual AI agent processing logic
            # This is where we'll integrate with CrewAI
            pass
            
        except Exception as e:
            self.jobs[job_id]["status"] = JobStatus.FAILED
            self.jobs[job_id]["error"] = str(e)
            
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
            "error": job.get("error")
        }
        
    async def get_agent_status(self) -> Dict:
        """Get status of all AI agents"""
        return {
            "total_agents": 4,  # 3 screening + 1 reporting
            "active_agents": len(self.active_jobs),
            "queue_length": len(self.jobs)
        } 