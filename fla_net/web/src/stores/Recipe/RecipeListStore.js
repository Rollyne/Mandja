import alt from '../../alt';
import RecipeListActions from '../../actions/Recipe/RecipeListActions';

class RecipeListStore {
    constructor() {
        this.bindActions(RecipeListActions);

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
}

export default alt.createStore(RecipeListStore);
