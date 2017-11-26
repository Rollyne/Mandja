import React, { Component } from 'react';
import './styles/App.css';
import './styles/main.css';
import Routes from './routes';
import Navbar from './components/Navbar';

class App extends Component {
    state = { loading: false };

    componentDidMount() {
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
