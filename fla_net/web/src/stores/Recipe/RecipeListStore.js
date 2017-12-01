import alt from '../../alt';
import RecipeListActions from '../../actions/Recipe/RecipeListActions';
import RecipeDetailActions from '../../actions/Recipe/RecipeDetailActions';

class RecipeListStore {
    constructor() {
        this.bindActions(RecipeListActions);
        this.bindListeners({
            onRemoveRecipeSuccess: RecipeDetailActions.removeRecipeSuccess,
        });

        this.recipes = [];
        this.currentPage = 1;
        this.itemsCount = 1;
        this.search = '';
    }

    getRecipesSuccess(data) {
        this.recipes = data[0].results;
        this.currentPage = data[1];
        this.itemsCount = data[0].count;
    }

    getRecipesFail(error) {
        console.log('Error getting the latest recipes', error);
    }

    onHandleSearchChange(e) {
        this.search = e.target.value;
    }

    onRemoveRecipeSuccess(id) {
        console.log(id);
        console.log(this.recipes.find(recipe => recipe.id === id));
        delete this.recipes.find(recipe => recipe.id === id);
    }
}

export default alt.createStore(RecipeListStore);
