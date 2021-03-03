"""
db.py

Methods to interact with database for data scraper.
"""
import pathlib
import sqlite3

BASE_DIR = pathlib.Path(__file__).parent.absolute()
DB_PATH = BASE_DIR.joinpath('..', 'database.db')

connection = sqlite3.connect(DB_PATH)


def ensure_scrape_tables():
    print("db!")
    print(connection.total_changes)


def cleanup():
    print("data scraper closed connection to database.db")
    connection.close()


if __name__ == "__main__":
    try:
        ensure_scrape_tables()
    finally:
        cleanup()
