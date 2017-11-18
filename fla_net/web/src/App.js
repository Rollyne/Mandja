import React, { Component } from 'react';
import './styles/App.css';
import './styles/main.css';
import Routes from './routes';
import Navbar from './components/Navbar';
import UserActions from './actions/UserActions';

class App extends Component {
    state = { loading: false };

    componentDidMount() {
        UserActions.loginUser();
    }

    render() {
        return (
            <div className="App">
                <Navbar history={this.props.history} />
                <Routes />
            </div>
        );
    }
}

export default App;
