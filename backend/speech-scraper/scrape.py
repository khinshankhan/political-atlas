import requests
import bs4

def get_text_from_class(soup, classname):
    soup = soup.find(attrs={'class': classname})
    return soup.text if soup else '-'

def get_href_from_class(soup, classname):
    soup = soup.find(attrs={'class': classname})
    return soup.get('href') if soup else '-'

def millerscrape():
    speeches = []

    baselink = 'https://millercenter.org'

    listlink = 'https://millercenter.org/the-presidency/presidential-speeches'
    listhtml = requests.get(listlink).text
    listsoup = bs4.BeautifulSoup(listhtml, features='html.parser')

    # get next page if it exists
    nextpage = listsoup.find(attrs={'class':'pager__item'})
    if nextpage:
        listlink = listlink + nextpage.find('a').get('href')
    print(listlink)

    for speech in listsoup.findAll(attrs={'class':'views-row'}):
        title = get_text_from_class(speech, 'views-field-title')

        speechlink = baselink + speech.find('a').get('href')

        speechhtml = requests.get(speechlink).text
        speechsoup = bs4.BeautifulSoup(speechhtml, features='html.parser')

        politician = get_text_from_class(speechsoup, 'president-name')

        videolink = get_href_from_class(speechsoup, 'download-trigger full-video')

        audiolink = get_href_from_class(speechsoup, 'download-trigger audio')

        date = get_text_from_class(speechsoup, 'episode-date')

        description = get_text_from_class(speechsoup, 'about-sidebar--intro').replace('\n', '')

        sentences = speechsoup.find(attrs={'class': 'transcript-inner'}).findAll('p')
        transcript = ' '.join(sentence.text for sentence in sentences).replace('\n', '')

        dump = {
            'politician': politician,
            'title': title,
            'speech-link': speechlink,
            'video-link': videolink,
            'audio-link': audiolink,
            'date': date,
            'description': description,
            'transcript': transcript
        }

        speeches.append(dump)

    return speeches

if __name__ == '__main__':
    dump = millerscrape()
    for speech in dump:
        print(speech['title'])
        print(speech['description'])
        print()
