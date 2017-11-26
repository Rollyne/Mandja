import pandas as pd
import os
import numpy as np

from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics.pairwise import cosine_similarity
from collections import OrderedDict
from math import isnan


def get_top_replacements():
    # TODO: Get the top n replacements for an ingredient

    pass


def get_top_recommendations_multiple():
    # TODO: Get the top n additions to a set of ingredients
    pass


def get_recipe_ingredients_cos_similarity(ingrX_bin: np.ndarray):
    """
    Makes a tf-idf transformation of a binary matrix and it feeds it to a cosine similarity algorithm.
    :param ingrX_bin:
    A numpy ndarray containing binary representation of ingredients.
    :return:
    Returns cosine similarity matrix based on the tf-idf of the inputted ingrX_bin.
    """
    transformer = TfidfTransformer()
    tfidf = transformer.fit_transform(ingrX_bin).toarray()
    cos = cosine_similarity(tfidf)

    return cos


def get_top_matches(ingredient_name: str, top_n: int = 5):
    """
    Gets the top ingredient matches for given ingredient based on the F1 of the cosine similarity between
    the ingredients, compounds and recipes.
    :param ingredient_name:
    The name of the target ingredient.
    :param top_n:
    The number of ingredients that should be returned.
    :return:
    Returns a dictionary containing the top N ingredients with their similarity value.
    """

    if not os.path.exists("cos_compounds.pkl") or not os.path.exists("cos_recipes.pkl"):
        save_cos_similarities_to_pkl()

    cos_comp_ingr = pd.read_pickle("cos_compounds.pkl")[ingredient_name]
    cos_recipe_ingr = pd.read_pickle("cos_recipes.pkl")[ingredient_name]

    f1_paired = {}

    for k, v in cos_comp_ingr.items():
        f1_paired[k] = (2 * cos_comp_ingr[k] * cos_recipe_ingr[k]) / (cos_comp_ingr[k] + cos_recipe_ingr[k])

    f1_paired = {k: f1_paired[k] for k in f1_paired if not isnan(f1_paired[k])}

    d_descending = OrderedDict(sorted(f1_paired.items(), key=lambda kv: kv[1], reverse=True))

    result = {}

    i = 0
    for k, v in d_descending.items():
        i += 1
        if (i > top_n+1):
            break
        result[k] = v

    return result


def save_cos_similarities_to_pkl():
    """
    Gets and saves in pickle files the cosine similarities of the ingredients for both compounds and recipes and includes the
    ingredient labels for the columns and rows. The format of the sets is pandas DataFrame.
    """

    recipe_ingrX_bin = np.transpose(pd.read_pickle("data/recipe_ingr_bin.pkl"))

    ingr_comp_bin = pd.read_pickle("data/ingr_comp_bin.pkl")
    ingr_inters = pd.read_pickle("data/ingr_inters.pkl")

    cos_recipes = pd.DataFrame(get_recipe_ingredients_cos_similarity(recipe_ingrX_bin))
    cos_compounds = pd.DataFrame(get_recipe_ingredients_cos_similarity(ingr_comp_bin))

    cos_recipes.columns = ingr_inters.values[:, 0]
    cos_recipes.index = ingr_inters.values[:, 0]
    print(cos_recipes)
    cos_compounds.columns = ingr_inters.values[:, 0]
    cos_compounds.index = ingr_inters.values[:, 0]

    cos_recipes.to_pickle("cos_recipes.pkl")
    cos_compounds.to_pickle("cos_compounds.pkl")



if __name__ == "__main__":
    print(get_top_matches(input("Ingredient: "), int(input("Top n: "))))









