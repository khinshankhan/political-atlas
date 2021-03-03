"""
db.py

Methods to interact with database for data scraper.
"""
import pathlib
import sqlite3
import sys

BASE_DIR = pathlib.Path(__file__).parent.absolute()
DB_PATH = BASE_DIR.joinpath('..', 'database.db')

connection = None
try:
    connection = sqlite3.connect(DB_PATH)
except Exception as e:
    print("data scraper was unable to make a connection to database.db")
    print(e)
    sys.exit()


def db_query(query):
    try:
        c = connection.cursor()
        c.execute(query)
    except Exception as e:
        print(e)


def ensure_scrape_tables():
    create_scraped_table = """CREATE TABLE IF NOT EXISTS scraped (
                               id integer PRIMARY KEY,
                               politician text NOT NULL,
                               title text NOT NULL,
                               speech_link text NOT NULL,
                               video_link text NOT NULL,
                               audio_link text NOT NULL,
                               date text NOT NULL,
                               description text NOT NULL,
                               transcript text NOT NULL
                             );"""
    db_query(create_scraped_table)

def cleanup():
    if connection:
        connection.close()
        print("data scraper closed connection to database.db")
    else:
        print("data scraper has no active connection to database.db")


if __name__ == "__main__":
    try:
        ensure_scrape_tables()
    finally:
        cleanup()
