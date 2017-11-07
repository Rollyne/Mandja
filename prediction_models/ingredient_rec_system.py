import numpy as np
from prediction_models.recipe_region_classification import *
from sklearn.decomposition import NMF


if __name__ == "__main__":

    #all_ingredients, Xingr, _ = load_ingredients_and_regions_from_file(True)

    #X = np.array(parse_ingredients_to_features(Xingr, all_ingredients))

    one_ingredient_bin = [1 if sum(n)==1 else 0 for n in X]

    X = np.delete(X, np.argwhere(one_ingredient_bin), axis=0)

    model = NMF(init='random', random_state=0)

    print("Training")
    W = model.fit_transform(X)

    # print("Loading")
    # with open("ingredient_rec_NMF.pkl", 'rb') as f:
    #     model = load(f)

    print("Trained")

    print(model.reconstruction_err_)

    x_element = get_and_split_input_recipe_ingredients()
    x_new = parse_ingredients_region_to_binary([x_element], list(all_ingredients))

    w_new = model.transform(x_new)
    x_trans = model.inverse_transform(w_new)


    #result = parse_features_to_ingredients([[1 if n>0 else 0 for n in sorted(x_trans[0], reverse=True)[:10]]], all_ingredients)
    #print(result)



