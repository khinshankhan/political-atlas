import requests
import bs4

listhtml = requests.get('https://millercenter.org/the-presidency/presidential-speeches').text
listsoup = bs4.BeautifulSoup(listhtml, features='html.parser')

for i in listsoup.findAll(attrs={'class':'views-field-title'}):
    print(i)
    print()
