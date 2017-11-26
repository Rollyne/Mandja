import React from 'react';
import { Link } from 'react-router-dom';

import alt from '../../alt';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import Auth from '../../Auth';

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
        UserActions.getCurrentUser();
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onChange);

        alt.recycle(UserStore);
    }

    render() {
        let userMenu;

        if (!Auth.isUserAuthenticated()) {
            userMenu = (
                <ul className="nav navbar-nav pull-right">
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            );
        } else {
            userMenu = (
                <ul className="nav navbar-nav pull-right">
                    <li>
                        <a>Hello, {this.state.profile.user.username} </a>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={UserActions.logoutUser}>Logout</Link>
                    </li>
                </ul>
            );
        }
        return (<div>{userMenu}</div>);
    }
}
