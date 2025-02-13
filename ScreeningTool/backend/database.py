"""
Database connection and operations using Supabase
"""
from typing import List, Dict, Optional
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.supabase_url = os.getenv("SUPABASE_URL")
        self.supabase_key = os.getenv("SUPABASE_KEY")
        self.client: Optional[Client] = None
        
    async def connect(self):
        """Initialize Supabase connection"""
        if not self.client:
            self.client = create_client(self.supabase_url, self.supabase_key)
            
    async def store_ris_entries(self, job_id: str, entries: List[Dict]) -> int:
        """Store parsed RIS entries in Supabase"""
        await self.connect()
        
        stored_count = 0
        for entry in entries:
            try:
                data = {
                    "job_id": job_id,
                    "metadata": entry["metadata"],
                    "title": entry["title"],
                    "abstract": entry["abstract"],
                    "keywords": entry["keywords"],
                    "decision": None,
                    "decision_rationale": None,
                    "claimed_by": None,
                    "claimed_at": None
                }
                
                result = self.client.table("studies").insert(data).execute()
                if result.data:
                    stored_count += 1
                
            except Exception as e:
                print(f"Error storing entry: {str(e)}")
                continue
                
        return stored_count
        
    async def get_unclaimed_studies(self, batch_size: int = 10) -> List[Dict]:
        """Get unclaimed studies for processing"""
        await self.connect()
        
        result = await self.client.rpc(
            'claim_studies_batch',
            {'batch_size': batch_size}
        ).execute()
        
        return result.data

_db_instance = None

async def init_db():
    """Initialize database connection"""
    global _db_instance
    if not _db_instance:
        _db_instance = Database()
        await _db_instance.connect()
    return _db_instance

async def get_db() -> Database:
    """Get database instance"""
    if not _db_instance:
        await init_db()
    return _db_instance 