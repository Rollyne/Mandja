import $ from 'jquery';
import alt from '../alt';
import Auth from '../Auth';


class UserActions {
    constructor() {
        this.generateActions(
            'loginUserSuccess',
            'loginUserFail',
            'logoutUserSuccess',
            'getCurrentUserSuccess',
            'getCurrentUserFail',
        );
    }

    loginUser() {
        function getCookie(name) {
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

        const csrftoken = getCookie('csrftoken');

        const request = {
            url: 'api/accounts/login/',
            method: 'post',
            data: JSON.stringify({ username: 'juji', password: 'bob4orba' }),
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': csrftoken,
            },
        };

        $.ajax(request)
            .done((csrfToken) => {
                this.loginUserSuccess(csrfToken);
            })
            .fail((error) => {
                // Redirect to login
                this.loginUserFail(error);
            });

        return true;
    }

    logoutUser() {
        this.logoutUserSuccess();
        return true;
    }

    getCurrentUser() {
        const request = {
            url: '/api/accounts/me/',
            method: 'get',
            headers: {
                Authorization: `Token ${Auth.getToken()}`,
            },
        };
        $.ajax(request)
            .done((user) => { this.getCurrentUserSuccess(user); })
            .fail((error) => { this.getCurrentUserFail(error); });
        return true;
    }
}

export default alt.createActions(UserActions);
