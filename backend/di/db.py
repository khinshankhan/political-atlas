"""
db.py

Methods to interact with database for data scraper.
"""
import json
import pathlib
import sqlite3
import sys

# HACK: sys path shouldn't be hacked together
# TODO: refactor whole project to use setup.py
path = str(pathlib.Path(pathlib.Path(__file__).parent.absolute()).parent.absolute())
sys.path.insert(0, path)
from speech_scraper import scrape

BASE_DIR = pathlib.Path(__file__).parent.absolute()
DB_PATH = BASE_DIR.joinpath('..', 'data', 'database.db')

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

def ensure_scrape_inserts():
    ensure_scrape_tables()
    c = connection.cursor()
    count = c.execute('select count(id) from scraped').fetchone()[0]
    if count > 0: return
    try:
        for speech in scrape.millerscrape():
            add_scrape(speech)
    finally:
        cleanup()

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


def get_scrape():
    ensure_scrape_inserts()
    c = connection.cursor()
    fields = ['id', 'politician', 'title', 'speech_link', 'video_link', 'audio_link', 'date', 'description', 'transcript']
    json_query = ', '.join("'%s', %s" % (x, x) for x in fields)
    return json.loads(c.execute('select json_group_array(json_object(%s)) from scraped' % json_query).fetchone()[0])

def cleanup():
    if connection:
        connection.close()
        print("data scraper closed connection to database.db")
    else:
        print("data scraper has no active connection to database.db")


if __name__ == "__main__":
    try:
        for i in get_scrape():
            print(i['title'])
    finally:
        cleanup()
