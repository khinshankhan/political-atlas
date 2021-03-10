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


def run(query):
    try:
        c = connection.cursor()
        c.execute(query)
        connection.commit()
    except Exception as e:
        print(e)


def run_with_named_placeholders(query, named_placeholders):
    try:
        c = connection.cursor()
        c.execute(query, named_placeholders)
        connection.commit()
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
    run(create_scraped_table)
    print("data scrape tables ensured")


def add_scrape(details):
    """
    Adds data as a row into scraped table.
    Takes in:
    politician, title, speech_link, video_link,
    audio_link, date, description, transcript.
    """
    add_query = """INSERT INTO
                   scraped(politician, title, speech_link, video_link,
                           audio_link, date, description, transcript)
                   VALUES (
                           :politician,
                           :title,
                           :speech_link,
                           :video_link,
                           :audio_link,
                           :date,
                           :description,
                           :transcript
                   );"""
    run_with_named_placeholders(add_query, details)


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
