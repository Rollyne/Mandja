import FormActions from '../actions/FormActions';
import UserActions from '../actions/UserActions';
import alt from '../alt';

class FormStore {
    constructor() {
        this.bindActions(FormActions);
        this.bindListeners({
            onRegisterUserFail: UserActions.registerUserFail,
            onRegisterUserSuccess: UserActions.registerUserSuccess,
            onLoginUserSuccess: UserActions.loginUserSuccess,
            onLoginUserFail: UserActions.loginUserFail,
        });

        this.profile = {
            account: {},
            user: {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                first_name: '',
                last_name: '',
            },
        };
    }

    onRegisterUserSuccess() {
        this.formSubmitState = 'has-success';
        this.usernameValidationState = '';
        this.passwordValidationState = '';
        this.message = 'User registered successfully';
    }

    onRegisterUserFail(error) {
        this.formSubmitState = 'has-error';
        this.message = error;
    }

    onUsernameValidationFail() {
        this.usernameValidationState = 'has-error';
        this.passwordValidationState = '';
        this.formSubmitState = '';
        this.message = 'Enter username.';
    }

    onPasswordValidationFail() {
        this.passwordValidationState = 'has-error';
        this.usernameValidationState = '';
        this.formSubmitState = '';
        this.message = 'Passwords do not match';
    }

    onHandleInputChange(e) {
        const target = e.target;
        this.profile.user[target.name] = target.value;
    }

    onLoginUserSuccess() {
        this.formSubmitState = 'has-success';
        this.usernameValidationState = '';
        this.passwordValidationState = '';
        this.profile.user.password = '';
    }

    onLoginUserFail(error) {
        this.formSubmitState = 'has-error';
        this.usernameValidationState = 'has-error';
        this.passwordValidationState = 'has-error';
        this.message = error;
    }
}

export default alt.createStore(FormStore);
