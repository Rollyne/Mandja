import pandas as pd
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics.pairwise import cosine_similarity
from collections import OrderedDict

import numpy as np


if __name__ == "__main__":
     ingrX_bin = np.transpose(pd.read_pickle("data/recipe_ingr_bin.pkl"))
     ingredients = pd.read_pickle("data/ingredients.pkl")
     print(len(ingredients))
     transformer = TfidfTransformer()
     tfidf = transformer.fit_transform(ingrX_bin).toarray()

     cos = cosine_similarity(tfidf)
     for i in range(100, 150):

          paired = dict(zip(ingredients.values[:,0], cos[:,i]))
          d_descending = OrderedDict(sorted(paired.items(), key=lambda kv: kv[1], reverse=True))

          i = 0
          for k,v in d_descending.items():
               i+=1
               if(i==5):
                    break
               print(k, " ", round(v, 3))
          print("________________________")







