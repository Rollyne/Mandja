import $ from 'jquery';
import alt from '../alt';
import Auth from '../Auth';

class CoupleActions {
    constructor() {
        this.generateActions(
            'getIngredientOptionsSuccess',
            'getIngredientOptionsFail',
            'getInitialIngredientOptionsSuccess',
            'getInitialIngredientOptionsFail',
            'getCoupleSuccess',
            'getCoupleFail',
            'addIngredientSuccess',
            'addIngredientFail',
            'getUserCouplesSuccess',
            'getUserCouplesFail',
            'handleNewCoupleTitleChange',
            'addCoupleSuccess',
            'addCoupleFail',
            'removeCoupleSuccess',
            'removeCoupleFail',
            'removeCoupleIngredientSuccess',
            'removeCoupleIngredientFail',
            'handleSearchChange',
        );
    }

    getIngredientOptions(ingredientNames) {
        if (typeof ingredientNames !== 'undefined') {
            if (ingredientNames.length > 0) {
                const data = {
                    ingredients: ingredientNames,
                    amount: -1,
                };
                const request = {
                    url: '/api/cookbook/recommendations/',
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
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
        }

        const request = {
            url: '/api/cookbook/ingredients/',
            method: 'GET',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((ingredients) => { this.getInitialIngredientOptionsSuccess(ingredients); })
            .fail((error) => { this.getInitialIngredientOptionsFail(error); });

        return true;
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

    addIngredient(ingredientName, coupleId) {
        const data = {
            ingredient_name: ingredientName,
        };
        const request = {
            url: `/api/cookbook/couples/${coupleId}/ingredients/`,
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((ingredient) => {
                this.addIngredientSuccess(ingredient);
            })
            .fail(error => this.addIngredientFail(error));

        return true;
    }

    // removeIngredient

    getUserCouples() {
        const request = {
            url: '/api/cookbook/couples/',
            method: 'get',
            accept: 'application/json',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done(data => this.getUserCouplesSuccess(data))
            .fail(error => this.getUserCouplesFail(error));
        return true;
    }

    addCouple(data) {
        const request = {
            url: '/api/cookbook/couples/',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((couple) => {
                this.addCoupleSuccess(couple);
            })
            .fail(error => this.addCoupleFail(error));

        return true;
    }

    removeCouple(id, index) {
        const request = {
            url: `/api/cookbook/couples/${id}/`,
            method: 'DELETE',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done(() => {
                this.removeCoupleSuccess(index);
            })
            .fail(error => this.removeCoupleFail(error));

        return true;
    }

    removeCoupleIngredient(incoupleId, coupleId, index) {
        const request = {
            url: `/api/cookbook/couples/${coupleId}/ingredients/${incoupleId}/`,
            method: 'DELETE',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done(() => {
                this.removeCoupleIngredientSuccess(index);
            })
            .fail(error => this.removeCoupleIngredientFail(error));

        return true;
    }

}

export default alt
    .createActions(CoupleActions);
