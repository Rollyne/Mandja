import numpy as np
import pandas as pd


def count_region_recipes():
    """
    Counts the recipes for each region.
    :return:
    Returns a dictionary containing the name for each region and it's recipes count.
    """
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
    """
    It splits the ingredients_regions.txt file to a label set, a feature set and a set containing all ingredients.
    :param equalize_regions:
    If True the recipe's count for each region is equal. It discards the excess recipes.
     This is useful when using the set for classification.
    If False it keeps all recipes whatever the count for each region is.
    :return:
    If equalize_regions is True it returns a Xingr set containing the names of the ingredients for each recipe
    and a Y(label set) containing the region name for each recipe.
    If equalize_regions is False it stores the label, feature and all_ingredients sets in a pickle file as DataFrames.
    """
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
                if len(x) >= 3:
                    all_ingredients.add(x)
                    ingredients.add(x)
            Xingr.append(ingredients)
    if equalize_regions:
        return pd.DataFrame(Xingr), pd.DataFrame(Y)
    else:
        pd.DataFrame(list(all_ingredients)).to_pickle("data/region_ingredients.pkl")
        pd.DataFrame(Xingr).to_pickle("data/region_ingrX.pkl")
        pd.DataFrame(Y).to_pickle("data/regionY.pkl")

def intersect_ingredients():
    """
    Intersects both ingredient data sets and saves the result in file ingr_inters.pkl
    """

    ingr_details = pd.read_csv("data/ingr_info.tsv", sep='\t')
    ingr_set = set(ingr_details[['ingredient name']].values[:,0])

    ingredients_rec = set(pd.read_pickle("data/region_ingredients.pkl").values[:, 0])

    ingr_inters = ingr_set.intersection(ingredients_rec)

    pd.DataFrame(list(ingr_inters)).to_pickle("data/ingr_inters.pkl")

def save_ingredients_compounds_bin_to_file():
    """
    Joins the compound info table with the ingredient info table through the ingr_comp table.
    It stores the binary representation [0, 1, 0, ...] of each ingredient's compounds in a pickle file as DataFrame.
    It stores the intersection between the ingredients for which we know the compounds and the ingredients
    which are used in the recipes for which we know the regions in a pickle file as DataFrame.
    """
    ingr_details = pd.read_csv("data/ingr_info.tsv", sep='\t')
    ingr_comp = pd.read_csv("data/ingr_comp.tsv", sep='\t')
    comp_details = pd.read_csv("data/comp_info.tsv", sep='\t')

    ingr_comp_j = ingr_details\
        .set_index("# id").join(ingr_comp.set_index("# ingredient id"))\
        .set_index("compound id").join(comp_details.set_index("# id"))\
        .drop(columns=["category", "CAS number"])\
        .dropna()

    comps = set(ingr_comp_j[['Compound name']].values[:,0])

    ingr_inters = pd.read_pickle("data/ingr_inters.pkl")
    ingr_comp_bin = []

    for ingr in ingr_inters.values[:,0]:
        ingr_comps = ingr_comp_j.ix[ingr_comp_j['ingredient name'] == ingr][['Compound name']].values[:,0]
        comp_bin = ([1 if comp in ingr_comps else 0 for comp in comps])
        ingr_comp_bin.append(comp_bin)

    pd.DataFrame(ingr_comp_bin).to_pickle("data/ingr_comp_bin.pkl")



def parse_ingredients_to_binary(ingrX: pd.DataFrame, all_ingredients: pd.DataFrame):
    """
    Parses given names of ingredients to binary pandas DataFrame
    :param ingrX:
    A pandas DataFrame containing the names of the ingredients for a particular recipe.
    :param all_ingredients:
    A pandas DataFrame containing all of the ingredients.
    :return:
    Returns a pandas DataFrame containing the binary representation [0, 1, 0, ...] of the ingredients' names.
    """
    X = []
    for element in ingrX.values:
        Xel = [1 if ingr in element else 0 for ingr in all_ingredients.values]
        if(sum(Xel) > 0):
            X.append(Xel)
    return pd.DataFrame(X)


def parse_binary_features_to_ingredients(binX: pd.DataFrame, all_ingredients: pd.DataFrame):
    """
    Takes a binary X DataFrame containing ingredients in a recipe and parses it to string list
    with the name of each ingredient.
    :param binX:
    A pandas DataFrame containing ingredients in binary [0, 1, 0, ...] format.
    :param all_ingredients:
    A pandas DataFrame containing all ingredients used for parsing the given binX to binary.
    :return:
    Returns a list of ingredients' names for the given binX.
    """
    indexes = [np.argwhere(idx) for idx in binX.values()]
    ingredients = [list(all_ingredients.values())[idx[0]] for idx in indexes[0]]
    return ingredients


def get_input_recipe_ingredients():
    """
    Asks for console input containing recipe ingredients until "exit" is entered.
    :return:
    Returns a pandas DataFrame containing the inputted ingredients in lowercase.
    """
    ingredients = set([])
    print("Exit to stop")
    while True:
        ingredient = input("Gimme ingredient: ")
        if ingredient.lower() == "exit":
            break
        ingredients.add(ingredient)


    return pd.DataFrame(list(ingredients))


if __name__ == "__main__":

    print("Splitting data..")
    split_ingredients_and_regions_to_file()

    print("Parsing ingredients to binary..")
    # # It is important to run this function first(or not run it at all) so that both binary parsing functions can use the same ingredients file
    # intersect_ingredients()

    save_ingredients_compounds_bin_to_file()
    binX = parse_ingredients_to_binary(ingrX=pd.read_pickle("data/region_ingrX.pkl"),
                                       all_ingredients=pd.read_pickle("data/ingr_inters.pkl"))
    binX.to_pickle("data/recipe_ingr_bin.pkl")


