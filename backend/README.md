# Backend of Political Atlas

## Dependencies

We haven't tested our code with python2, but we recommend installing python3.

We recommend using [pyenv](https://github.com/pyenv/pyenv) to create a virtual
environment to manage dependencies. Once you set up and activate your preferred
environment, install the dependencies using

```bash
python3 -m pip install -r requirements.txt
```

## Data

We used the [IBM API](https://www.ibm.com/watson/services/tone-analyzer/) and
[DeepAffects API](https://www.deepaffects.com/), so you'll need to obtain API
keys for both of them. In the `transcript_analysis` directory, you'll place a
json with the key value pairs of `API_KEY` and your IBM API Key. In the
`audio_analysis` directory, you'll place a json with the key value pairs of
`API_KEY` and your DeepAffects API Key.

Then, you'll have to scrape the speeches using

```bash
python speech_scraper/scrape.py
```

And then you'll run the IBM analyses using

```bash
python transcript_analysis/ibm_api.py
```

Finally, you'll run the DeepAffects analyses using

```bash
python audio_analysis/audtio_emotions.py
```

## Run the Project

Finally, you can run the project using

```bash
python server/__init__py
```
