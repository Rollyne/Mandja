import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);

        this.latestRecipes = [];
    }

    getLatestRecipesSuccess(recipes) {
        this.latestRecipes = recipes;
    }

    getLatestRecipesFail(error) {
        console.log('Error getting the latest recipes', error);
    }
}

export default alt.createStore(HomeStore);
