from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

import json
import pathlib
import sys

path = str(pathlib.Path(pathlib.Path(__file__).parent.absolute()).parent.absolute())
sys.path.insert(0, path)
from di import db

app = Flask(__name__)
cors = CORS(app)

@app.route('/webhook', methods=['POST'])
def postResponse():
    data = request.json
    request_id = data.get('request_id')
    if request_id:
        speech_id = db.get_speech_id_deep(request_id)
        print(speech_id)
        db.add_deepaffects(speech_id, data)
    return Response(status=200)

@app.route('/speech')
@cross_origin()
def get_speech():
    sid = request.args.get('id')
    if sid:
        return db.get_scrape_id(sid)
    else:
        return {}

@app.route('/ibm')
@cross_origin()
def get_ibm():
    sid = request.args.get('id')
    if sid:
        return db.get_ibm_analsyis(sid)
    else:
        return {}

@app.route('/deepaffects')
@cross_origin()
def get_deepaffects():
    sid = request.args.get('id')
    if sid:
        return db.get_deepaffects_analsyis(sid)
    else:
        return {}

@app.route('/list')
@cross_origin()
def get_list():
    return {'data': db.get_scrape(['transcript'])}

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")
