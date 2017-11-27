import React from 'react';
import { Link } from 'react-router-dom';
import NavbarStore from '../stores/NavbarActions';
import UserStore from '../stores/UserStore';
import NavbarUserMenu from './User/NavbarUserMenu';
import Auth from '../Auth';

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = NavbarStore.getState();

        this.onChange = this.onChange.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        NavbarStore.listen(this.onChange);
        UserStore.listen(this.onChange);
    }

    componentWillUnmount() {
        NavbarStore.unlisten(this.onChange);
    }

    render() {
        const authenticatedOptions = Auth.isUserAuthenticated() ? (
            <li>
                <Link to="/couples">Couples</Link>
            </li>
        ) : null;
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <Link to="/" className="navbar-brand">
                        Mandja
                    </Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/">Home</Link>
                            <Link to="/recipes">Recipes</Link>
                        </li>
                        {authenticatedOptions}
                    </ul>

                    <NavbarUserMenu />
                </div>
            </nav>
        );
    }
}


export default Navbar;

