"""
app.py

Heart of data scraper.
This will initialize any relevant tables and fill them with speech data.
"""
import scrape
import db

if __name__ == "__main__":
    try:
        db.ensure_scrape_tables()
        for speech in scrape.millerscrape():
            db.add_scrape(
                speech['politician'],
                speech['title'],
                speech['speech-link'],
                speech['video-link'],
                speech['audio-link'],
                speech['date'],
                speech['description'],
                speech['transcript']
            )
    finally:
        db.cleanup()
