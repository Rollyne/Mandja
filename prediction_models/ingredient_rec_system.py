import pandas as pd
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics.pairwise import cosine_similarity

import numpy as np


if __name__ == "__main__":
     ingrX_bin = np.transpose(pd.read_pickle("data/recipe_ingr_bin.pkl"))
     ingredients = pd.read_pickle("data/ingredients.pkl")

     transformer = TfidfTransformer()
     tfidf = transformer.fit_transform(ingrX_bin).toarray()

     cos = cosine_similarity(tfidf)








