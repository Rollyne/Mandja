import alt from '../alt';
import UserActions from '../actions/UserActions';
import Auth from '../Auth';

class UserStore {
    constructor() {
        this.bindActions(UserActions);

        this.user = {};
    }

    onLoginUserSuccess(csrfToken) {
        Auth.authenticateUser(csrfToken.token);
        console.log('LoggedIn');
    }

    onLoginUserFail(error) {
        console.log(error);
    }

    onLogoutUserSuccess() {
        Auth.deauthenticateUser();
        console.log('Logged out.');
    }

    onGetCurrentUserSuccess(user) {
        this.user = user;
    }

    onGetCurrentUserFail(error) {
        console.log(error);
    }
}

export default alt.createStore(UserStore);
