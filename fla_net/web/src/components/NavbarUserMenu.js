import React from 'react';
import { Link } from 'react-router-dom';

import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import Auth from '../Auth';

export default class NavbarUserMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = UserStore.getState();

        this.onChange = this.onChange.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        UserStore.listen(this.onChange);
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onChange);
    }

    render() {
        let userMenu;

        if (!Auth.isUserAuthenticated()) {
            userMenu = (
                <ul className="nav navbar-nav pull-right">
                    <li>
                        <a onClick={UserActions.loginUser}>Login</a>
                    </li>
                    <li>
                        <Link to="/accounts/register">Register</Link>
                    </li>
                </ul>
            );
        } else {
            userMenu = (
                <ul className="nav navbar-nav pull-right">
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <a onClick={UserActions.logoutUser}>Logout</a>
                    </li>
                </ul>
            );
        }
        return (<div>{userMenu}</div>);
    }
}
