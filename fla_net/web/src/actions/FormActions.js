import alt from '../alt';

class FormActions {
    constructor() {
        this.generateActions(
            'handleInputChange',
            'usernameValidationFail',
            'passwordValidationFail',
        );
    }
}


export default alt.createActions(FormActions);
