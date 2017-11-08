import numpy as np
import pandas as pd


def count_region_recipes():
    LabelsCount = {}
    with open('data/ingredients_regions.txt', 'r') as f:
        for line in f:
            args = line.split(',')
            if args[0] in LabelsCount:
                LabelsCount[args[0]] += 1
            else:
                LabelsCount[args[0]] = 1
    return LabelsCount


def split_ingredients_and_regions_to_file(equalize_regions: bool = False):
    all_ingredients = set()
    Xingr = []
    Y = []
    max_recipes = 0

    if equalize_regions:
        max_recipes = min(count_region_recipes().values())
    StoredLabelsCount = {}

    with open('data/ingredients_regions.txt', 'r') as f:
        for line in f:
            args = line.split(',')
            ingredients = set()

            if args[0] in StoredLabelsCount:
                StoredLabelsCount[args[0]] += 1
            else:
                StoredLabelsCount[args[0]] = 1

            if equalize_regions and StoredLabelsCount[args[0]] > max_recipes:
                continue

            Y.append(args[0])
            for x in args[1:]:
                ingredient_words = x.split(" ")
                for iw in ingredient_words:
                    if len(iw) >= 3:
                        all_ingredients.add(iw)
                        ingredients.add(iw)
            Xingr.append(ingredients)
    if equalize_regions:
        return pd.DataFrame(Xingr), pd.DataFrame(Y)
    else:
        pd.DataFrame(list(all_ingredients)).to_pickle("data/ingredients.pkl")
        pd.DataFrame(Xingr).to_pickle("data/region_ingrX.pkl")
        pd.DataFrame(Y).to_pickle("data/regionY.pkl")


def parse_ingredients_region_to_binary(region_ingrX: pd.DataFrame, all_ingredients: pd.DataFrame):
    X = []
    for element in region_ingrX.values:
        Xel = []
        for ingr in all_ingredients.values:
            if ingr in element:
                Xel.append(1)
            else:
                Xel.append(0)
        X.append(Xel)
    return pd.DataFrame(X)


def parse_binary_features_to_ingredients(binX: pd.DataFrame, all_ingredients: pd.DataFrame):
    indexes = [np.argwhere(idx) for idx in binX.values()]
    ingredients = [list(all_ingredients.values())[idx[0]] for idx in indexes[0]]
    return ingredients


def get_and_split_input_recipe_ingredients():
    ingredients = set([])
    ingredients_splitted = set([])
    print("Exit to stop")
    while True:
        ingredient = input("Gimme ingredient: ")
        if ingredient.lower() == "exit":
            break
        ingredients.add(ingredient)

    for ingr in ingredients:
        ingrs = ingr.split(" ")
        for i in ingrs:
            if len(i) >= 3:
                ingredients_splitted.add(i)

    return pd.DataFrame(list(ingredients_splitted))


if __name__ == "__main__":
    print("Splitting data..")
    split_ingredients_and_regions_to_file()
    print("Parsing ingredients to binary..")
    binX = parse_ingredients_region_to_binary(region_ingrX=pd.read_pickle("data/region_ingrX.pkl"),
                                       all_ingredients=pd.read_pickle("data/ingredients.pkl"))
    binX.to_pickle("data/recipe_ingr_bin.pkl")
