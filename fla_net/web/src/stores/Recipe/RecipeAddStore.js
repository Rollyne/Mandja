import toastr from 'toastr';
import alt from '../../alt';
import RecipeAddActions from '../../actions/Recipe/RecipeAddActions';

class RecipeAddStore {
    constructor() {
        this.bindActions(RecipeAddActions);
        this.recipe = {
            title: '',
            cookingTime: '',
            handsOnTime: '',
            ingredients: [
                {
                    ingredient_id: '',
                    quantity: '',
                    unit: '',
                },
            ],
            descriptions: [{}],
            images: [],

        };
        this.ingredientOptions = [];
    }

    onAddRecipeSuccess(recipe) {
        console.log(recipe);
        toastr.success('Successfully added recipe');
    }

    onAddRecipeFail(error) {
        toastr.error(error);
    }

    onHandleInputChange(e) {
        const name = e.target.name;
        this.recipe[name] = e.target.value;
    }

    onTitleValidationFail() {
        this.titleValidationState = 'has-error';
        this.helpBlock = 'Please add title.';
    }

    onGetIngredientOptionsSuccess(ingredients) {
        this.ingredientOptions = ingredients;
    }
    onGetIngredientOptionsFail(error) {
        console.log(error);
    }

    onHandleIngredientInputChange(data) {
        this.recipe.ingredients[data[0]].ingredient_id = data[1].value;
    }
    onHandleUnitInputChange(data) {
        this.recipe.ingredients[data[0]].unit = data[1].value;
    }
    onHandleQuantityInputChange(data) {
        this.recipe.ingredients[data[0]].quantity = data[1];
    }
    onHandleDescriptionContentChange(data) {
        this.recipe.descriptions[data[0]].content = data[1];
    }
    onAddClick(set) {
        this.recipe[set].push({});
    }
    onRemoveClick(data) {
        const value = this.recipe[data[1]].slice();
        value.splice(data[0], 1);
        this.recipe[data[1]] = value;
    }

    onImageDrop(picture) {
        this.recipe.images.push({ image: picture[0] });
    }

}

export default alt.createStore(RecipeAddStore);
