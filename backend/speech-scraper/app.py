"""
app.py

Heart of data scraper.
This will initialize any relevant tables and fill them with speech data.
"""
from pathlib import Path
import scrape
import sys

# HACK: sys path shouldn't be hacked together
# TODO: refactor whole project to use setup.py
path = str(Path(Path(__file__).parent.absolute()).parent.absolute())
sys.path.insert(0, path)
from di import db

if __name__ == "__main__":
    try:
        db.ensure_scrape_tables()
        for speech in scrape.millerscrape():
            # TODO: fix in actual scrape generation
            speech['speech_link'] = speech['speech-link']
            speech['video_link'] = speech['video-link']
            speech['audio_link'] = speech['audio-link']
            db.add_scrape(speech)
    finally:
        db.cleanup()
