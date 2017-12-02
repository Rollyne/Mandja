import React from 'react';

import alt from '../../alt';
import TextGroup from '../BaseForm/TextGroup';
import Form from '../BaseForm/Form';
import Submit from '../BaseForm/Submit';
import FormStore from '../../stores/FormStore';
import FormActions from '../../actions/FormActions';
import UserActions from '../../actions/UserActions';

export default class UserRegister extends React.Component {
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

        const data = this.state.profile;

        if (!data.user.username) {
            return FormActions.usernameValidationFail();
        }
        if (!data.user.password
            || !data.user.confirmPassword
            || data.user.password !== data.user.confirmPassword) {
            return FormActions.passwordValidationFail();
        }

        UserActions.registerUser(data);

        this.props.history.push('/');


        return true;
    }

    render() {
        return (
            <Form
                title="Register"
                handleSubmit={this.handleSubmit}
                submitState={this.state.formSubmitState}
                message={this.state.message}>

                <TextGroup
                    type="text"
                    label="Username"
                    value={this.state.profile.user.username}
                    autoFocus
                    handleChange={FormActions.handleInputChange}
                    validationState={this.state.usernameValidationState}
                    message={this.state.message}
                    parent="user"
                    name="username" />

                <TextGroup
                    type="email"
                    label="Email"
                    value={this.state.profile.user.email}
                    autoFocus
                    handleChange={FormActions.handleInputChange}
                    parent="user"
                    name="email" />

                <TextGroup
                    type="password"
                    label="Password"
                    value={this.state.profile.user.password}
                    handleChange={FormActions.handleInputChange}
                    validationState={this.state.passwordValidationState}
                    message={this.state.message}
                    parent="user"
                    name="password" />

                <TextGroup
                    type="password"
                    label="Confirm Password"
                    value={this.state.profile.user.confirmPassword}
                    handleChange={FormActions.handleInputChange}
                    validationState={this.state.passwordValidationState}
                    message={this.state.message}
                    data-parent="user"
                    name="confirmPassword" />

                <TextGroup
                    type="text"
                    label="First Name"
                    handleChange={FormActions.handleInputChange}
                    value={this.state.profile.user.first_name}
                    parent="user"
                    name="first_name" />

                <TextGroup
                    type="text"
                    label="Last Name"
                    handleChange={FormActions.handleInputChange}
                    value={this.state.profile.user.last_name}
                    parent="user"
                    name="last_name" />

                <Submit type="btn-primary" value="Register" />
            </Form>
        );
    }

}
