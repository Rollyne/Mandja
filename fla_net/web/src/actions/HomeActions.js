import $ from 'jquery';

import alt from '../alt';


class HomeActions {
    constructor() {
        this.generateActions(
            'getLatestRecipesSuccess',
            'getLatestRecipesFail',
        );
    }

    getLatestRecipes() {
        const request = {
            url: '/api/cookbook/latest/10/',
            method: 'get',
            accept: 'application/json',
        };
        $.ajax(request)
            .done(data => this.getLatestRecipesSuccess(data))
            .fail(error => this.getLatestRecipesFail(error));
    }
}

export default alt.createActions(HomeActions);
