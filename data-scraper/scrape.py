import requests
import bs4

baselink = 'http://millercenter.org'

listlink = 'https://millercenter.org/the-presidency/presidential-speeches'
listhtml = requests.get(listlink).text
listsoup = bs4.BeautifulSoup(listhtml, features='html.parser')

for speech in listsoup.findAll(attrs={'class':'views-field-title'})[:3]:
    print('Title:', speech.text)

    speechlink = speech.find('a').get('href')
    print('Speech Link:', speechlink)

    speechhtml = requests.get(baselink + speechlink).text
    speechsoup = bs4.BeautifulSoup(speechhtml, features='html.parser')

    print('Politician:', speechsoup.find(attrs={'class': 'president-name'}).text)

    print('Video Link:', speechsoup.find(attrs={'class': 'download-trigger full-video'}).get('href'))
    print('Audio Link:', speechsoup.find(attrs={'class': 'download-trigger audio'}).get('href'))

    print('Date:', speechsoup.find(attrs={'class': 'episode-date'}).text)
    print('Description:', speechsoup.find(attrs={'class': 'about-sidebar--intro'}).text)

    print()
