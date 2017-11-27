import $ from 'jquery';

import alt from '../../alt';


class HomeActions {
    constructor() {
        this.generateActions(
            'getRecipesSuccess',
            'getRecipesFail',
            'handleSearchChange',
        );
    }

    getRecipes(page, search) {
        const request = {
            url: `/api/cookbook/?page=${page}&search=${typeof search === 'undefined' ? '' : search}&ordering=-date_published`,
            method: 'get',
            accept: 'application/json',
        };
        $.ajax(request)
            .done(data => this.getRecipesSuccess(data, page))
            .fail(error => this.getRecipesFail(error));
    }
}

export default alt.createActions(HomeActions);
