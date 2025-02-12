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
            parsed_entry = {
                'title': entry.get('title', ''),
                'abstract': entry.get('abstract', ''),
                'keywords': entry.get('keywords', []),
                'authors': entry.get('authors', []),
                'year': entry.get('year'),
                'doi': entry.get('doi'),
                'journal': entry.get('journal'),
                'volume': entry.get('volume'),
                'issue': entry.get('issue'),
                'pages': entry.get('pages'),
                'type': entry.get('type', 'article')
            }
            parsed_entries.append(parsed_entry)
            
        return parsed_entries
        
    except Exception as e:
        raise ValueError(f"Error parsing RIS file: {str(e)}") 