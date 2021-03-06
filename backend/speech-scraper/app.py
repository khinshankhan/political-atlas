"""
app.py

Heart of data scraper.
This will initialize any relevant tables and fill them with speech data.
"""
import db

if __name__ == "__main__":
    try:
        db.ensure_scrape_tables()
        # TODO: remove this example once the scrape uses the add query
        # db.add_scrape("John Doe", "Inauguration", "foo", "bar", "baz",
        #               "date", "cool speech", "hello")
    finally:
        db.cleanup()
