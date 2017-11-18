import $ from 'jquery';
import alt from '../../alt';
import Auth from '../../Auth';


class RecipeAddActions {
    constructor() {
        this.generateActions(
            'handleInputChange',
            'titleValidationFail',
            'cookingTimeValidationFail',
            'handsOnTimeValidationFail',
            'addRecipeSuccess',
            'addRecipeFail',
        );
    }

    addRecipe(data) {
        console.log(data);
        // function getCookie(name) {
        //     let cookieValue = null;
        //     if (document.cookie && document.cookie !== '') {
        //         const cookies = document.cookie.split(';');
        //         for (let i = 0; i < cookies.length; i += 1) {
        //             const cookie = $.trim(cookies[i]);
        //             // Does this cookie string begin with the name we want?
        //             if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // }
        //
        // const csrftoken = getCookie('csrftoken');
        console.log(Auth.getToken());
        const request = {
            url: '/api/cookbook/',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        console.log(request);
        $.ajax(request)
            .done(() => {
                this.addRecipeSuccess();
            })
            .fail(() => this.addRecipeFail());

        return true;
    }
}

export default alt.createActions(RecipeAddActions);
