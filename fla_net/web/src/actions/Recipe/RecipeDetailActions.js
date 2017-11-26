
import $ from 'jquery';
import alt from '../../alt';
import Auth from '../../Auth';

class RecipeDetailActions {
    constructor() {
        this.generateActions(
            'getRecipeFail',
            'getRecipeSuccess',
            'handleInputChange',
            'postCommentSuccess',
            'postCommentFail',
            'commentContentValidationFail',
            'getRecipeCommentsSuccess',
            'getRecipeCommentsFail',
        );
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i += 1) {
                const cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    getRecipe(id) {
        const csrfToken = this.getCookie('csrftoken');

        const request = {
            url: `/api/cookbook/${id}/`,
            method: 'get',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
                'X-CSRFToken': csrfToken,
            },
        };
        $.ajax(request)
            .done((recipe) => { this.getRecipeSuccess(recipe); })
            .fail((error) => { this.getRecipeFail(error); });
        return true;
    }

    postComment(data, recipeId) {
        console.log(data);
        const request = {
            url: `/api/cookbook/${recipeId}/comments/`,
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        console.log(request);
        $.ajax(request)
            .done((comment) => {
                this.postCommentSuccess(comment);
            })
            .fail(error => this.postCommentFail(error));

        return true;
    }

    getRecipeComments(recipeId) {
        const csrftoken = this.getCookie('csrftoken');

        const request = {
            url: `api/cookbook/${recipeId}/comments/`,
            method: 'get',
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': csrftoken,
            },
        };

        $.ajax(request)
            .done((comments) => { this.getRecipeCommentsSuccess(comments); })
            .fail((error) => { this.getRecipeCommentsFail(error); });
        return true;
    }
}

export default alt.createActions(RecipeDetailActions);
