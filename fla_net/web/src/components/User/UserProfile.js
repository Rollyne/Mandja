import React from 'react';

import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import alt from '../../alt';

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
        UserActions.getCurrentUser(this.props.match.params.id);
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onChange);
        alt.recycle(UserStore);
    }

    render() {
        return (
            <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 animated fadeInUp">
                <div className="well profile">
                    <div className="col-sm-12">
                        <div className="col-xs-12 col-sm-8">
                            <h2>{this.state.profile.user.username}</h2>
                            <p> {this.state.profile.user.first_name} {this.state.profile.user.last_name}</p>
                            <p><strong>E-mail: </strong> {this.state.profile.user.email}</p>
                            {/* <p><strong>Skills: </strong> */}
                            {/* <span className="tags">html5</span> */}
                            {/* <span className="tags">css3</span> */}
                            {/* <span className="tags">jquery</span> */}
                            {/* <span className="tags">bootstrap3</span> */}
                            {/* </p> */}
                        </div>
                        <div className="col-xs-12 col-sm-4 text-center" />
                    </div>
                    <div className="col-xs-12 divider text-center">
                        <div className="col-xs-12 col-sm-4 emphasis">
                            <h2><strong>{this.state.profile.recipe_count}</strong></h2>
                            <p>
                                <small>Recipes</small>
                            </p>
                            {/* <button className="btn btn-success btn-block">
                            <span className="fa fa-plus-circle" /> Follow */}
                            {/* </button> */}
                        </div>
                        <div className="col-xs-12 col-sm-4 emphasis">
                            <h2><strong>{this.state.profile.couple_count}</strong></h2>
                            <p>
                                <small>Couples</small>
                            </p>
                        </div>
                        {/* <div className="col-xs-12 col-sm-4 emphasis"> */}
                        {/* <h2><strong>43</strong></h2> */}
                        {/* <p> */}
                        {/* <small>Snippets</small> */}
                        {/* </p> */}
                        {/* <div className="btn-group dropup btn-block"> */}
                        {/* <button type="button" className="btn btn-primary">
                                <span className="fa fa-gear" /> Options */}
                        {/* </button> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
