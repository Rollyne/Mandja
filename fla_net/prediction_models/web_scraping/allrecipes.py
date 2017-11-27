import requests
import json
from bs4 import BeautifulSoup


def get_recipes_url(page_url: str, params: dict, href_class: str):
    # Returns all urls on the page that lead to a recipe

    r = requests.get(page_url, params)
    soup = BeautifulSoup(r.text, 'html.parser')

    result = []
    for a in soup.findAll('a', class_ = href_class, href = True):
        result.append(a['href'])

    return result


def get_description_for_recipe(recipe_url: str, elem_dict: dict):
    # Returns description from a recipe url

    r = requests.get('http://allrecipes.com' + recipe_url)
    soup = BeautifulSoup(r.text, 'html.parser')

    result = {}
    for tag, class_dict in elem_dict.items():
        for name, class_value in class_dict.items():
            result_list = []
            for element in soup.findAll(tag, class_ = class_value):
                result_list.append(element.text)
            result[name] = result_list

    return result


url = 'http://allrecipes.com/recipes/'
params = {'page': 1, 'grouping' : 'all'}
href_class_url = 'fixed-recipe-card__title-link'

elem_dict = {
    'h1' : {
        'name' : 'recipe-summary__h1'
    },
    'span' : {
        'ingr' : 'recipe-ingred_txt added',
        'time' : 'prepTime__item--time',
        'dir' : 'recipe-directions__list--item'
    }
}

with open('allrecipes.json', 'w') as fp:
    for url in get_recipes_url(url, params, href_class_url):
        json.dump(get_description_for_recipe(url, elem_dict), fp)

