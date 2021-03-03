import requests
import bs4

listhtml = requests.get('https://millercenter.org/the-presidency/presidential-speeches').text
listsoup = bs4.BeautifulSoup(listhtml, features='html.parser')

for speech in listsoup.findAll(attrs={'class':'views-field-title'})[:5]:
    print("Title:", speech.text)
    print()
