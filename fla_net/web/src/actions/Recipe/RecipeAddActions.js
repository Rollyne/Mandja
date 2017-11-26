import $ from 'jquery';
import objectToFormData from 'object-to-formdata';

import alt from '../../alt';
import Auth from '../../Auth';
import '../../utilities/Helpers';


class RecipeAddActions {
    constructor() {
        this.generateActions(
            'handleInputChange',
            'handleIngredientInputChange',
            'handleUnitInputChange',
            'handleQuantityInputChange',
            'handleDescriptionContentChange',
            'titleValidationFail',
            'cookingTimeValidationFail',
            'handsOnTimeValidationFail',
            'addRecipeSuccess',
            'addRecipeFail',
            'getIngredientOptionsSuccess',
            'getIngredientOptionsFail',
            'addClick',
            'removeClick',
            'imageDrop',
        );
    }

    addRecipe(data) {
        const formData = objectToFormData(data);
        formData.set('ingredients', JSON.stringify(data.ingredients));
        formData.set('descriptions', JSON.stringify(data.descriptions));
        const request = {
            processData: false,
            url: '/api/cookbook/',
            method: 'POST',
            data: formData,
            contentType: false,
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        console.log(request);
        $.ajax(request)
            .done((recipe) => {
                this.addRecipeSuccess(recipe);
            })
            .fail(() => this.addRecipeFail());

        return true;
    }

    getIngredientOptions() {
        const request = {
            url: '/api/cookbook/ingredients/',
            method: 'GET',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((ingredients) => { this.getIngredientOptionsSuccess(ingredients); })
            .fail((error) => { this.getIngredientOptionsFail(error); });

        return true;
    }
}

export default alt.createActions(RecipeAddActions);
