import toastr from 'toastr';
import alt from '../../alt';
import RecipeModifyActions from '../../actions/Recipe/RecipeModifyActions';

class RecipeModifyStore {
    constructor() {
        this.bindActions(RecipeModifyActions);
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
            category: {},

        };
        this.ingredientOptions = [{
            id: '',
            name: '',
        }];
        this.categoryOptions = [];
        this.ingredientAdd = false;
        this.newIngredient = {
            name: '',
        };
        this.activeTab = '1';

        this.regions = [
        { value: 'af', label: 'African' },
        { value: 'ea', label: 'East Asian' },
        { value: 'eeu', label: 'Eastern European' },
        { value: 'la', label: 'Latin American' },
        { value: 'mde', label: 'Middle Eastern' },
        { value: 'na', label: 'North American' },
        ];
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
        console.log(this.ingredientOptions);
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
    onHandleRegionInputChange(target) {
        this.recipe.region = target.value;
    }
    onHandleQuantityInputChange(data) {
        this.recipe.ingredients[data[0]].quantity = data[1];
    }
    onHandleServingsInputChange(value) {
        this.recipe.servings = value[0];
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

    onGetRecipeForModificationSuccess(recipe) {
        this.recipe = recipe;
        this.recipe.handsOnTime = recipe.hands_on_time;
        this.recipe.cookingTime = recipe.cooking_time;
    }

    onGetRecipeForModificationFail(error) {
        toastr.error(error);
    }

    onToggleIngredientAdd() {
        this.toggleIngredientAdd = !this.toggleIngredientAdd;
    }

    onHandleAddIngredientInputChange(e) {
        this.newIngredient[e.target.name] = e.target.value;
    }

    onAddCustomIngredientSuccess(ingredient) {
        this.ingredientOptions.push(ingredient);
        toastr.success('Ingredient added.');
    }

    onAddCustomIngredientFail(error) {
        toastr.error(error.detail);
    }

    onToggleTab(tab) {
        if (this.activeTab !== tab) {
            this.activeTab = tab;
        }
    }
    onGetCategoryOptionsSuccess(categories) {
        this.categoryOptions = categories;
    }
    onGetCategoryOptionsFail(error) {
        toastr.error(error.response.detail);
    }

    onHandleCategoryInputChange(target) {
        this.recipe.category.id = target.value;
    }

    onGetRegionClassificationSuccess(region) {
        console.log(region);
        const reg = this.regions.find(regs => regs.label.replace(' ', '') === region);
        this.recipe.region = reg.value;
    }

    onGetRegionClassificationFail(error) {
        toastr.error(error);
    }

}

export default alt.createStore(RecipeModifyStore);
