from typing import List, Dict

async def validate_ris_structure(entries: List[Dict]) -> bool:
    """Validate required fields and data types"""
    required_fields = ['title', 'abstract', 'year']
    for idx, entry in enumerate(entries):
        for field in required_fields:
            if not entry.get(field):
                raise ValueError(f"Study {idx+1} missing {field}")
        if not isinstance(entry.get('keywords'), list):
            raise ValueError(f"Study {idx+1} has invalid keywords format")
    return True
