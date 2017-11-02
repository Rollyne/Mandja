from sklearn.cross_validation import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from _pickle import dump, load
from os import path
import numpy as np

def count_region_recipes():
    LabelsCount = {}
    with open('ingredients_regions.txt', 'r') as f:
        for line in f:
            args = line.split(',')
            if args[0] in LabelsCount:
                LabelsCount[args[0]] += 1
            else:
                LabelsCount[args[0]] = 1
    return LabelsCount


def load_ingredients_and_regions_from_file(equalize_regions: bool):
    all_ingredients = set()
    Xingr = []
    Y = []
    max_recipes = 0

    if equalize_regions:
        max_recipes = min(count_region_recipes().values())
    StoredLabelsCount = {}

    with open('ingredients_regions.txt', 'r') as f:
        for line in f:
            args = line.split(',')
            ingredients = set()

            if args[0] in StoredLabelsCount:
                StoredLabelsCount[args[0]] += 1
            else:
                StoredLabelsCount[args[0]] = 1

            if  equalize_regions and StoredLabelsCount[args[0]] > max_recipes:
                continue

            Y.append(args[0])
            for x in args[1:]:
                ingredient_words = x.split(" ")
                for iw in ingredient_words:
                    if len(iw) >= 3:
                        all_ingredients.add(iw)
                        ingredients.add(iw)
            Xingr.append(ingredients)
    return all_ingredients, Xingr, Y


def parse_ingredients_to_features(Xingr: list, all_ingredients:list):
    X = []
    for element in Xingr:
        Xel = []
        for ingr in all_ingredients:
            if ingr in element:
                Xel.append(1)
            else:
                Xel.append(0)
        X.append(Xel)
    return X


def parse_features_to_ingredients(X, all_ingredients):
    indexes = [np.argwhere(idx) for idx in X]
    ingredients = [list(all_ingredients)[idx[0]] for idx in indexes[0]]
    return ingredients


def get_and_split_recipe_ingredients():
    ingredients = set([])
    ingredients_splitted = set([])
    while True:
        ingredient = input("Gimme ingredient: ")
        if ingredient == "0":
            break
        ingredients.add(ingredient)

    for ingr in ingredients:
        ingrs = ingr.split(" ")
        for i in ingrs:
            if len(i) >= 3:
                ingredients_splitted.add(i)
    return ingredients_splitted


def train_classifier(X_train, X_test, Y_train, Y_test):
    print("Training classifier..")

    clf = GradientBoostingClassifier()

    clf.fit(X_train, Y_train)

    with open('recipe_region_classifier.pkl', 'wb') as pkl:
        dump(clf, pkl)                                        

    print("Accuracy: ", clf.score(X_test, Y_test))
    return clf


def prepare_data(all_ingredients, Xingr, Y):

    print("Parsing data..")
    X = parse_ingredients_to_features(Xingr, list(all_ingredients))

    print("Splitting data..")
    return train_test_split(X, Y, test_size=0.20, random_state=42)

# print("Loading data..")
# all_ingredients, Xingr, Y = load_ingredients_and_regions_from_file(equalize_regions=True)
# print(len(Y)/6)
#
# if not path.exists('recipe_region_classifier.pkl'):
#     X_train, X_test, Y_train, Y_test = prepare_data(all_ingredients, Xingr, Y)
#     clf = train_classifier(X_train, X_test, Y_train, Y_test)
# else:
#     with open('recipe_region_classifier.pkl', 'rb') as f:
#         clf = load(f)
#
# x_element = get_and_split_recipe_ingredients()
# x_new = parse_ingredients_to_features([x_element], list(all_ingredients))
# print(x_new)
# parse_features_to_ingredients(x_new, all_ingredients)
#
# print(clf.predict(x_new))
#
# count_region_recipes()