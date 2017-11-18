import React from 'react';

import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

export default class UserProfile extends React.Component {
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
    }

    render() {
        return (
            <div>
                <div className="container profile-container">
                    <div className="profile-img" />
                    <div className="profile-info clearfix">
                        <h2><strong>{this.state.user.username}</strong></h2>
                        <h2><strong>{this.state.user.email}</strong></h2>
                    </div>
                </div>
            </div>
        );
    }
}
