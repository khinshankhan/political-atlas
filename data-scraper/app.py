"""
app.py

Heart of data scraper.
This will initialize any relevant tables and fill them with speech data.
"""

import db

if __name__ == "__main__":
    db.ensure_scrape_tables()
