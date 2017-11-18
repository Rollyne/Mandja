import alt from '../../alt';
import RecipeAddActions from '../../actions/Recipe/RecipeAddActions';

class RecipeAddStore {
    constructor() {
        this.bindActions(RecipeAddActions);

        this.recipe = {
            title: '',
            cookingTime: '',
            handsOnTime: '',

        };
    }

    onAddRecipeSuccess() {
        console.log('Successfully added recipe');
    }

    onAddRecipeFail(error) {
        console.log(error);
    }

    onHandleInputChange(e) {
        console.log(e.target.name);
        const name = e.target.name;
        this.recipe[name] = e.target.value;
    }

    onTitleValidationFail() {
        this.titleValidationState = 'has-error';
        this.helpBlock = 'Please add title.';
    }

}

export default alt.createStore(RecipeAddStore);
