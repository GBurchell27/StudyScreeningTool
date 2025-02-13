from dotenv import load_dotenv
import asyncio
from database import Database
from utils.risfileparsing import parse_ris_file

async def test_supabase_connection():
    # Initialize database connection
    db = Database()
    try:
        await db.connect()
        print("Successfully connected to Supabase")
        
        # Test RIS content (3 studies)
        test_ris_content = """TY  - JOUR
AB  - This is a test abstract 1
TI  - Test Study 1
KW  - keyword1
KW  - keyword2
ER  -

TY  - JOUR
AB  - This is a test abstract 2
TI  - Test Study 2
KW  - keyword3
KW  - keyword4
ER  -

TY  - JOUR
AB  - This is a test abstract 3
TI  - Test Study 3
KW  - keyword5
KW  - keyword6
ER  -"""

        try:
            # Parse RIS content
            parsed_entries = await parse_ris_file(test_ris_content.encode())
            print(f"Successfully parsed {len(parsed_entries)} entries")
            
            if parsed_entries:
                print("Sample entry structure:", list(parsed_entries[0].keys()))
            
            # Store in Supabase
            job_id = "test_job_123"
            stored_count = await db.store_ris_entries(job_id, parsed_entries)
            print(f"Successfully stored {stored_count} entries in Supabase")
            
        except ValueError as e:
            print(f"RIS parsing error: {str(e)}")
        except Exception as e:
            print(f"Unexpected error during processing: {str(e)}")
            raise  # Re-raise to see full traceback
            
    except Exception as e:
        print(f"Database connection error: {str(e)}")
        raise  # Re-raise to see full traceback

if __name__ == "__main__":
    # Create and run async event loop
    asyncio.run(test_supabase_connection())