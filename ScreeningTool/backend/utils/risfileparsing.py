# rispy.loads converts the RIS format into a list of dictionaries (each entry is one complete study from the RIS file)
# entry = One study from the RIS file
# parsed_entry = The same study formatted for Supabase schema

# Each entry is one complete study from the RIS file, and we transform each one into a parsed_entry that matches our Supabase database columns

# supabase table:
#       Column A: Complete study metadata. This would contain all the raw metadata for each study, possibly stored as a JSON or TEXT field.  
#       Column B: Title. Extracted from the metadata for quick access and searchability.  
#       Column C: Abstract. Also extracted for easy access and analysis.  
#       Column D: Keywords. Could be stored as an array (`TEXT[]` in PostgreSQL) for efficient searching and filtering.  
#       Column E: Decision. ENUM type with values `'include'`, `'exclude'`, or `'maybe'`.  
#       Column F: Decision rationale. A TEXT field to store the AI’s reasoning for its decision.



from typing import List, Dict
import rispy
from datetime import datetime

async def parse_ris_file(content: bytes) -> List[Dict]:
    """
    Parse RIS file into database-ready format:
    - Stores complete metadata as JSON
    - Extracts key fields for AI screening
    """
    # 1. Parse the RIS file content into Python objects (list of dictionaries)
    try:
        # rispy.loads converts the RIS format into a list of dictionaries
        entries = rispy.loads(content.decode())
        # Initialize empty list to store our processed entries
        parsed_entries = []
        
        # 2. Process each entry from the RIS file
        for idx, entry in enumerate(entries):
            # 3. Validate that required fields exist
            if not entry.get('title') or not entry.get('abstract'):
                raise ValueError(f"Entry {idx+1} missing required field: title or abstract")
            
            # 4. Create a database-ready format for each entry
            parsed_entry = {
                # Store complete original entry as JSON
                'metadata': entry,  # Column A: All original RIS data
                
                # Extract and clean specific fields needed for AI screening
                'title': entry.get('title', '').strip(),  # Column B: Clean title
                'abstract': entry.get('abstract', '').strip(),  # Column C: Clean abstract
                'keywords': [kw.strip() for kw in entry.get('keywords', [])],  # Column D: List of keywords
                
                # Add fields for AI decisions (initially empty)
                'decision': None,  # Column E: Will be filled by AI (include/exclude/maybe)
                'decision_rationale': None,  # Column F: AI's reasoning
            }
            
            # 5. Add the processed entry to our list
            parsed_entries.append(parsed_entry)
            
        # 6. Return all processed entries
        return parsed_entries

    # 7. Error handling
    except Exception as e:
        raise ValueError(f"RIS validation failed: {str(e)}") 