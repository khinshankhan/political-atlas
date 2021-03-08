import requests, base64

API_KEY = "gtst56RagNR7ECbKXMX1b07lMJ2cHqyn"
WEB_HOOK = "https://webhook.site/8e0d6163-b59e-4b3e-9180-956b68eca7a4"

async_url = "https://proxy.api.deepaffects.com/audio/generic/api/v2/async/recognise_emotion" # async api url
sync_url = "https://proxy.api.deepaffects.com/audio/generic/api/v2/sync/recognise_emotion" # sync api url

querystring = {"apikey": API_KEY, "webhook": WEB_HOOK}

payload = {
    "encoding": "Mp3",
    "languageCode": "en-US"
}

audio_file_name = 'trump_mexico2.mp3'

with open(audio_file_name, 'rb') as fin:
    audio_content = fin.read()
payload["content"] = base64.b64encode(audio_content).decode('utf-8')

headers = {
    'Content-Type': "application/json",
}

# Async Request
# response = requests.post(async_url, json=payload, headers=headers, params=querystring)

# alternatively use sync request for payload upto 1 minute
response = requests.post(sync_url, json=payload, headers=headers, params=querystring)

print(response.text)

with open('response.txt', 'w') as output:
    output.write(response.text)
