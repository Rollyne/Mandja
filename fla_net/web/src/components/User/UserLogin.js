import React from 'react';

import alt from '../../alt';
import UserActions from '../../actions/UserActions';
import FormActions from '../../actions/FormActions';
import FormStore from '../../stores/FormStore';
import Form from '../BaseForm/Form';
import TextGroup from '../BaseForm/TextGroup';
import Submit from '../BaseForm/Submit';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = FormStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        FormStore.listen(this.onChange);
    }

    componentWillUnmount() {
        FormStore.unlisten(this.onChange);
        alt.recycle(FormStore);
    }

    handleSubmit(e) {
        e.preventDefault();

        const username = this.state.profile.user.username;
        const password = this.state.profile.user.password;

        if (!username) {
            FormActions.usernameValidationFail();
            return;
        }
        if (!password) {
            FormActions.passwordValidationFail();
            return;
        }

        UserActions.loginUser({
            username,
            password,
        });

        this.props.history.push('/');
    }

    render() {
        return (
            <Form
                title="Login"
                handleSubmit={this.handleSubmit}
                submitState={this.state.formSubmitState}
                message={this.state.message}>

                <TextGroup
                    type="text"
                    value={this.state.profile.user.username}
                    label="Username"
                    handleChange={FormActions.handleInputChange}
                    validationState={this.state.usernameValidationState}
                    name="username" />

                <TextGroup
                    type="password"
                    value={this.state.profile.user.password}
                    label="Password"
                    handleChange={FormActions.handleInputChange}
                    validationState={this.state.passwordValidationState}
                    message={this.state.message}
                    name="password" />

                <Submit
                    type="btn-primary"
                    value="Login" />

            </Form>
        );
    }

}
export default UserLogin;
