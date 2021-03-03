import requests
import bs4

baselink = 'http://millercenter.org'

listlink = 'https://millercenter.org/the-presidency/presidential-speeches'
listhtml = requests.get(listlink).text
listsoup = bs4.BeautifulSoup(listhtml, features='html.parser')

for speech in listsoup.findAll(attrs={'class':'views-field-title'})[:1]:
    title = speech.text
    print('Title:', title)

    speechlink = speech.find('a').get('href')
    print('Speech Link:', speechlink)

    speechhtml = requests.get(baselink + speechlink).text
    speechsoup = bs4.BeautifulSoup(speechhtml, features='html.parser')

    politician = speechsoup.find(attrs={'class': 'president-name'}).text
    print('Politician:', politician)

    videolink = speechsoup.find(attrs={'class': 'download-trigger full-video'}).get('href')
    print('Video Link:', videolink)

    audiolink = speechsoup.find(attrs={'class': 'download-trigger audio'}).get('href')
    print('Audio Link:', audiolink)

    date = speechsoup.find(attrs={'class': 'episode-date'}).text
    print('Date:', date)

    description = speechsoup.find(attrs={'class': 'about-sidebar--intro'}).text
    print('Description:', description)

    sentences = speechsoup.find(attrs={'class': 'transcript-inner'}).findAll('p')
    transcript = ' '.join(sentence.text for sentence in sentences).replace('\n', '')
    print('Transcript')
    print(transcript)

    print()
