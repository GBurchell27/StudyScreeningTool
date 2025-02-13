"""
RIS file parsing utilities
"""
from typing import List, Dict
import rispy
from datetime import datetime

async def parse_ris_file(content: bytes) -> List[Dict]:
    """Parse and validate RIS file in one step"""
    try:
        entries = rispy.loads(content.decode())
        parsed_entries = []
        
        required_fields = ['title', 'abstract', 'year']
        valid_types = ['JOUR', 'CONF', 'THES', 'RPRT']
        
        for idx, entry in enumerate(entries):
            # Validate required fields
            for field in required_fields:
                if not entry.get(field):
                    raise ValueError(f"Entry {idx+1} missing required field: {field}")
            
            # Validate publication type
            if entry.get('type') not in valid_types:
                raise ValueError(f"Invalid type in entry {idx+1}: {entry.get('type')}")
            
            # Normalize and validate year
            year = entry.get('year')
            if year:
                try:
                    year = int(year)
                    if year < 1900 or year > datetime.now().year:
                        raise ValueError
                except:
                    raise ValueError(f"Invalid year in entry {idx+1}: {year}")
            
            # Build parsed entry
            parsed_entry = {
                'title': entry.get('title', '').strip(),
                'abstract': entry.get('abstract', '').strip(),
                'keywords': [kw.strip() for kw in entry.get('keywords', [])],
                'year': year,
                # Add other fields from instructions-AI-Agents.txt
                'doi': entry.get('doi', '').strip(),
                'journal': entry.get('journal', '').strip(),
                'pages': entry.get('pages', '').strip()
            }
            
            parsed_entries.append(parsed_entry)
            
        return parsed_entries
    except Exception as e:
        raise ValueError(f"RIS validation failed: {str(e)}") 