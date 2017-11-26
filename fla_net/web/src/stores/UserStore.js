import toastr from 'toastr';
import alt from '../alt';
import UserActions from '../actions/UserActions';
import Auth from '../Auth';

class UserStore {
    constructor() {
        this.bindActions(UserActions);

        this.profile = {
            account: {},
            user: {},
        };
    }

    onLoginUserSuccess(csrfToken) {
        Auth.authenticateUser(csrfToken.token);
        toastr.success('Logged in.');
    }

    onLoginUserFail(error) {
        toastr.error(error);
    }

    onLogoutUserSuccess() {
        Auth.deauthenticateUser();
        toastr.success('Logged out.');
    }

    onGetCurrentUserSuccess(profile) {
        this.profile = profile;
    }

    onGetCurrentUserFail(error) {
        toastr.error(error);
    }
}

export default alt.createStore(UserStore);
