from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum

class DecisionType(str, Enum):
    INCLUDE = "include"
    EXCLUDE = "exclude"
    MAYBE = "maybe"

class JobStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class ScreeningCriteria(BaseModel):
    inclusion: List[str] = Field(..., min_items=1)
    exclusion: List[str] = Field(..., min_items=1)
    
class StudyMetadata(BaseModel):
    title: str
    abstract: Optional[str]
    keywords: Optional[List[str]]
    authors: Optional[List[str]]
    year: Optional[int]
    doi: Optional[str]
    
class ScreeningResult(BaseModel):
    decision: DecisionType
    confidence: float
    rationale: str 