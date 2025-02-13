"""
RIS file parsing utilities
"""
from typing import List, Dict
import rispy

async def parse_ris_file(content: bytes) -> List[Dict]:
    """Parse RIS file content into structured data"""
    try:
        entries = rispy.loads(content.decode())
        parsed_entries = []
        
        for entry in entries:
            # Validate required fields
            if not entry.get('title'):
                raise ValueError("Study missing title")
                
            # Normalize fields
            parsed_entry = {
                'title': entry.get('title', '').strip(),
                'abstract': entry.get('abstract', '').strip(),
                'keywords': [kw.strip() for kw in entry.get('keywords', [])],
                'authors': [a.strip() for a in entry.get('authors', [])],
                'year': int(entry['year']) if entry.get('year') else None,
                # Add other fields from instructions-AI-Agents.txt
                'doi': entry.get('doi', '').strip(),
                'journal': entry.get('journal', '').strip(),
                'pages': entry.get('pages', '').strip()
            }
            
            # Add validation for study types
            if entry.get('type') not in ['JOUR', 'CONF']:
                raise ValueError(f"Unsupported study type: {entry.get('type')}")
            
            parsed_entries.append(parsed_entry)
            
        return parsed_entries
    except Exception as e:
        raise ValueError(f"RIS parsing failed: {str(e)}") 