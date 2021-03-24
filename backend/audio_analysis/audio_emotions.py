import base64
import json
import requests
import sys

with open('config.json') as config_file:
    config = json.load(config_file)

# TEST webhook
# WEB_HOOK = "https://webhook.site/8e0d6163-b59e-4b3e-9180-956b68eca7a4"
WEB_HOOK = "http://142.93.74.113:80/webhook"

querystring: dict = {
    "apikey": config['API_KEY'], 
    "webhook": WEB_HOOK
}

payload: dict = {
    "encoding": "mp3",
    "languageCode": "en-US"
}

headers: dict = {
    'Content-Type': "application/json",
}

# Takes a local audio file and processes emotions
# Default: async response -> response sent to Webhook
# Can pass 2nd param of "sync" to get synchronous response & immediately print response. 
# Synchronous response limits audio file to 1 minute in duration
def audio_process_emotions_file(audio_file_name: str, response_type: str = "async") -> None:
    file_ending_index = audio_file_name.rfind('.')
    audio_type: str = audio_file_name[file_ending_index::]
    payload["encoding"] = audio_type

    with open(audio_file_name, 'rb') as fin:
        audio_content = fin.read()
        payload["content"] = base64.b64encode(audio_content).decode('utf-8')

    url: str = f"https://proxy.api.deepaffects.com/audio/generic/api/v2/{response_type}/recognise_emotion"
    response = requests.post(url, json=payload, headers=headers, params=querystring)
    if (response_type == "sync"):
        print(response.text)
    
# Takes a remote audio file and processes emotions
# async response -> response sent to Webhook
def audio_process_emotions(audio_url: str):
    audio_type: str = audio_url[audio_url.rfind('.') + 1::]

    if (audio_type not in ('wav', 'mp3', 'pcm', 'aac', 'mulaw', 'mp4', 'm4a', 'mov', 'wmv')):
        print("not valid audio_url")
        return

    payload["encoding"] = audio_type
    payload["url"] = audio_url

    url: str = "https://proxy.api.deepaffects.com/audio/generic/api/v2/async/recognise_emotion"
    response = requests.post(url, json=payload, headers=headers, params=querystring)
    return response.json().get('request_id')
