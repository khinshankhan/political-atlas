import bs4
import requests

def get_text_from_class(soup, classname):
    soup = soup.find(attrs={'class': classname})
    return soup.text if soup else '-'

def get_href_from_class(soup, classname):
    soup = soup.find(attrs={'class': classname})
    return soup.get('href') if soup else '-'

def millerscrape():
    speeches = []

    baselink = 'https://millercenter.org'
    nextbase = 'https://millercenter.org/the-presidency/presidential-speeches'
    listlink = nextbase
    nextpage = True

    while nextpage:

        listhtml = requests.get(listlink).text
        listsoup = bs4.BeautifulSoup(listhtml, features='html.parser')

        # get next page if it exists
        nextpage = listsoup.find(attrs={'class':'pager__item'})
        if nextpage:
            listlink = nextbase + nextpage.find('a').get('href')

        for speech in listsoup.findAll(attrs={'class':'views-row'}):
            # if speech is missing video/audio skip it
            if len(speech.find(attrs={'class':'speech-icons-column'}).findAll('span')) < 3:
                continue

            title = get_text_from_class(speech, 'views-field-title')

            speechlink = baselink + speech.find('a').get('href')

            speechhtml = requests.get(speechlink).text
            speechsoup = bs4.BeautifulSoup(speechhtml, features='html.parser')

            politician = get_text_from_class(speechsoup, 'president-name')

            videolink = get_href_from_class(speechsoup, 'download-trigger full-video')
            videolink = videolink[:videolink.find('?')]

            audiolink = get_href_from_class(speechsoup, 'download-trigger audio')
            audiolink = audiolink[:audiolink.find('?')]

            date = get_text_from_class(speechsoup, 'episode-date')

            description = get_text_from_class(speechsoup, 'about-sidebar--intro').replace('\n', '')

            sentences = speechsoup.find(attrs={'class': 'transcript-inner'}).findAll('p')
            transcript = ' '.join(sentence.text for sentence in sentences).replace('\n', '')

            dump = {
                'politician': politician,
                'title': title,
                'speech_link': speechlink,
                'video_link': videolink,
                'audio_link': audiolink,
                'date': date,
                'description': description,
                'transcript': transcript
            }

            speeches.append(dump)

    return speeches
