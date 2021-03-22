from flask import Flask, request, Response

import pathlib
import sys

path = str(pathlib.Path(pathlib.Path(__file__).parent.absolute()).parent.absolute())
sys.path.insert(0, path)
from di import db

app = Flask(__name__)

responses = []

@app.route('/webhook', methods=['GET'])
def getResponse():
    s = ""
    for r in responses:
        s += f"{r}\n"
    return s

@app.route('/webhook', methods=['POST'])
def postResponse():
    responses.append(request.json)
    print(request.json)
    return Response(status=200)

@app.route('/ibm')
def get_ibm():
    sid = request.args.get('id')
    if sid:
        return db.get_ibm_analsyis(sid)
    else:
        return {}

if __name__ == '__main__':
    app.debug = True
    app.run(host="0.0.0.0")
