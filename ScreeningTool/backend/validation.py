from typing import List, Dict
from .utils.risfileparsing import parse_ris_file
from .models import ScreeningCriteria

async def validate_ris_file(content: bytes) -> List[Dict]:
    """Validate RIS file format and content"""
    try:
        # Parse RIS content using utility function
        validated_entries = await parse_ris_file(content)
        
        if not validated_entries:
            raise ValueError("No valid entries found in RIS file")
            
        return validated_entries
        
    except Exception as e:
        raise ValueError(f"Invalid RIS file: {str(e)}")

async def validate_criteria(criteria: ScreeningCriteria) -> bool:
    """Validate screening criteria"""
    if not criteria.inclusion:
        raise ValueError("At least one inclusion criterion is required")
        
    if not criteria.exclusion:
        raise ValueError("At least one exclusion criterion is required")
        
    # TODO: Add more sophisticated validation using LLM
    # to check for ambiguous or contradictory criteria
    
    return True 