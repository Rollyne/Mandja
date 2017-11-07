from sklearn.cross_validation import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from _pickle import dump, load
from os import path
from prediction_models.data_preparation import *
import pandas as pd


def train_classifier(X_train, X_test, Y_train, Y_test):
    print("Training classifier..")

    clf = GradientBoostingClassifier()

    clf.fit(X_train, Y_train)

    with open('recipe_region_classifier.pkl', 'wb') as pkl:
        dump(clf, pkl)                                        

    print("Accuracy: ", clf.score(X_test, Y_test))
    return clf


def prepare_data():

    print("Parsing data..")
    X_r, Y = split_ingredients_and_regions_to_file(True)
    X = parse_ingredients_region_to_binary(region_ingrX=X_r, all_ingredients=pd.read_pickle("data/ingredients.pkl"))

    print("Splitting data..")
    return train_test_split(X, Y, test_size=0.20, random_state=42)


if __name__ == "__main__":


    if not path.exists('recipe_region_classifier.pkl'):
        print("Loading data..")
        X_train, X_test, Y_train, Y_test = prepare_data()
        clf = train_classifier(X_train, X_test, Y_train, Y_test)
    else:
        with open('recipe_region_classifier.pkl', 'rb') as f:
            clf = load(f)

    all_ingredients = pd.read_pickle("data/ingredients.pkl")

    x_element = get_and_split_input_recipe_ingredients()
    x_new = parse_ingredients_region_to_binary(x_element, all_ingredients)

    print(clf.predict(x_new.values)[0])