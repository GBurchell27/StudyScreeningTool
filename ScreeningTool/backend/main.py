from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Systematic Review Screening API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScreeningCriteria(BaseModel):
    inclusion: List[str]
    exclusion: List[str]
    year_range: Optional[tuple[int, int]] = None
    study_types: Optional[List[str]] = None

@app.post("/api/upload")
async def upload_ris(file: UploadFile = File(...)):
    """
    Upload and parse RIS file
    """
    if not file.filename.endswith('.ris'):
        return {"error": "Invalid file type. Please upload a RIS file."}
    
    # TODO: Implement RIS parsing
    return {"message": "File uploaded successfully"}

@app.post("/api/screen")
async def screen_studies(criteria: ScreeningCriteria):
    """
    Screen studies based on inclusion/exclusion criteria
    """
    # TODO: Implement screening logic
    return {"message": "Screening started"}

@app.get("/api/status/{job_id}")
async def get_status(job_id: str):
    """
    Get screening job status
    """
    # TODO: Implement status checking
    return {"status": "processing", "progress": 0} 