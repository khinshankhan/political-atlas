from flask import Flask, request, Response

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

if __name__ == '__main__':
    app.run()
