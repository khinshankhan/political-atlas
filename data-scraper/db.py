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


def ensure_scrape_tables():
    print("db!")
    print(connection.total_changes)


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
