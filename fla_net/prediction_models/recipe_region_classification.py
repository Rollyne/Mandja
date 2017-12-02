from _pickle import dump, load
import os

import pandas as pd
from sklearn.cross_validation import train_test_split
from sklearn.ensemble import GradientBoostingClassifier

from .data_preparation import split_ingredients_and_regions_to_file, parse_ingredients_to_binary, get_input_recipe_ingredients

path = os.path.dirname(__file__)

def train_classifier(X_train, X_test, Y_train, Y_test):
    """
    Trains and returns a recipe region classifier.
    :param X_train:
    Training feature set.
    :param X_test:
    Test feature set.
    :param Y_train:
    Training label set.
    :param Y_test:
    Test label set.
    :return:
    Returns a sklearn classifier.
    """
    print("Training classifier..")

    clf = GradientBoostingClassifier()

    clf.fit(X_train, Y_train)

    with open(os.path.join(path, 'recipe_region_classifier.pkl'), 'wb') as pkl:
        dump(clf, pkl)                                        

    print("Accuracy: ", clf.score(X_test, Y_test))
    return clf


def prepare_data():
    """
    Prepares the data using the data_preparation module and splits it into train and test data.
    :return:
    A tuple containing X_train, X_test, Y_train, Y_test
    """

    print("Parsing data..")
    X_r, Y = split_ingredients_and_regions_to_file(True)
    X = parse_ingredients_to_binary(ingrX=X_r, all_ingredients=pd.read_pickle(os.path.join(path, "data/region_ingredients.pkl")))

    print("Splitting data..")
    return train_test_split(X, Y, test_size=0.20, random_state=42)


def classify_region(X:pd.DataFrame):
    """
    Classifies the region for a given recipe based on its ingredients.
    :param X:
    A pandas DataFrame containing the ingredient names for a recipe.
    :return:
    It returns a region prediction for the given recipe.
    """
    if not os.path.exists(os.path.join(path, 'recipe_region_classifier.pkl')):
        print("Loading data..")
        X_train, X_test, Y_train, Y_test = prepare_data()
        clf = train_classifier(X_train, X_test, Y_train, Y_test)
    else:
        with open(os.path.join(path, 'recipe_region_classifier.pkl'), 'rb') as f:
            clf = load(f)

    all_ingredients = pd.read_pickle(os.path.join(path, "data/region_ingredients.pkl"))

    x_new = parse_ingredients_to_binary(X, all_ingredients)

    return clf.predict(x_new.values)[0]


if __name__ == "__main__":
    print(classify_region(get_input_recipe_ingredients()))
