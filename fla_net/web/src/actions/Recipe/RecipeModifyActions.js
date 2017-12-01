import $ from 'jquery';
import objectToFormData from 'object-to-formdata';

import alt from '../../alt';
import Auth from '../../Auth';
import '../../utilities/Helpers';


class RecipeModifyActions {
    constructor() {
        this.generateActions(
            'handleInputChange',
            'handleAddIngredientInputChange',
            'handleIngredientInputChange',
            'handleUnitInputChange',
            'handleRegionInputChange',
            'handleQuantityInputChange',
            'handleDescriptionContentChange',
            'handleServingsInputChange',
            'handleCategoryInputChange',
            'titleValidationFail',
            'cookingTimeValidationFail',
            'handsOnTimeValidationFail',
            'addRecipeSuccess',
            'addRecipeFail',
            'getIngredientOptionsSuccess',
            'getIngredientOptionsFail',
            'getCategoryOptionsSuccess',
            'getCategoryOptionsFail',
            'addClick',
            'removeClick',
            'imageDrop',
            'getRecipeForModificationSuccess',
            'getRecipeForModificationFail',
            'toggleIngredientAdd',
            'addCustomIngredientSuccess',
            'addCustomIngredientFail',
            'toggleTab',
            'getRegionClassificationSuccess',
            'getRegionClassificationFail',
        );
    }

    addRecipe(data, id) {
        const formData = objectToFormData(data);
        formData.set('ingredients', JSON.stringify(data.ingredients));
        formData.set('descriptions', JSON.stringify(data.descriptions));
        formData.set('category', JSON.stringify(data.category));
        if (typeof id === 'undefined') {
            console.log(data);
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
            $.ajax(request)
                .done((recipe) => {
                    this.addRecipeSuccess(recipe);
                })
                .fail(() => {
                    this.addRecipeFail();
                    return false;
                });
        } else {
            const request = {
                processData: false,
                url: `/api/cookbook/${id}/`,
                method: 'PATCH',
                data: formData,
                contentType: false,
                headers: {
                    Authorization: `Token ${Auth.getToken()}`,
                },
            };
            $.ajax(request)
                .done((recipe) => {
                    this.addRecipeSuccess(recipe);
                })
                .fail(() => {
                    this.addRecipeFail();
                    return false;
                });
        }
        return true;
    }

    getIngredientOptions(ingredientOptionsLength) {
        if (ingredientOptionsLength <= 1) {
            const request = {
                url: '/api/cookbook/ingredients/',
                method: 'GET',
                headers: {
                    Authorization: `Token ${Auth.getToken()}`,
                },
            };
            $.ajax(request)
                .done((ingredients) => {
                    this.getIngredientOptionsSuccess(ingredients);
                })
                .fail((error) => {
                    this.getIngredientOptionsFail(error);
                });

            return true;
        }
        return false;
    }

    getRegionClassification(ingredientNames) {
        if (typeof ingredientNames !== 'undefined') {
            if (ingredientNames.length > 0) {
                const data = {
                    ingredients: ingredientNames,
                };
                const request = {
                    url: '/api/cookbook/classifyregion/',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    headers: {
                        Authorization: `Token ${Auth.getToken()}`,
                    },
                };
                $.ajax(request)
                    .done((region) => {
                        this.getRegionClassificationSuccess(region);
                    })
                    .fail((error) => {
                        this.getRegionClassificationFail(error);
                        return false;
                    });
                return true;
            }
        }

        return false;
    }


    getCouple(id) {
        const request = {
            url: `/api/cookbook/couples/${id}/`,
            method: 'get',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((recipe) => {
                this.getCoupleSuccess(recipe);
            })
            .fail((error) => {
                this.getCoupleFail(error);
            });
        return true;
    }

    getCategoryOptions(categoryOptionsLength) {
        if (categoryOptionsLength === 0) {
            const request = {
                url: '/api/cookbook/categories/',
                method: 'GET',
                headers: {
                    Authorization: `Token ${Auth.getToken()}`,
                },
            };
            $.ajax(request)
                .done((categories) => {
                    this.getCategoryOptionsSuccess(categories);
                })
                .fail((error) => {
                    this.getCategoryOptionsFail(error);
                    return false;
                });
            return true;
        }
        return false;
    }

    getRecipeForModification(id) {
        if (typeof id === 'undefined') {
            return false;
        }

        const request = {
            url: `/api/cookbook/${id}/`,
            method: 'GET',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((recipe) => {
                this.getRecipeForModificationSuccess(recipe);
                console.log(recipe);
            })
            .fail((error) => {
                this.getRecipeForModificationFail(error);
                return false;
            });
        return true;
    }

    addCustomIngredient(data) {
        const request = {
            url: '/api/cookbook/ingredients/',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((ingredient) => {
                this.addCustomIngredientSuccess(ingredient);
            })
            .fail((error) => {
                this.addCustomIngredientFail(error);
                return false;
            });

        return true;
    }
}

export default alt.createActions(RecipeModifyActions);
