import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import NavbarStore from '../stores/NavbarActions';
import NavbarUserMenu from './NavbarUserMenu';

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

        $(document).ajaxStart(() => {
            this.setState({
                ajaxAnimationClass: 'fadeIn',
            });
        });

        $(document).ajaxComplete(() => {
            this.setState({
                ajaxAnimationClass: 'fadeOut',
            });
        });
    }

    componentWillUnmount() {
        NavbarStore.unlisten(this.onChange);
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#navbar">
                        <span className="sr-only">Toggle Navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <Link to="/" className="navbar-brand">
                        <span className={`triangles animated${this.state.ajaxAnimationClass}`}>
                            <div className="tri invert" />
                            <div className="tri invert" />
                            <div className="tri" />
                            <div className="tri invert" />
                            <div className="tri invert" />
                            <div className="tri" />
                            <div className="tri invert" />
                            <div className="tri" />
                            <div className="tri invert" />
                        </span>
                        FlaNet
                    </Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/recipes/add">Add Recipe</Link>
                        </li>
                    </ul>

                    <NavbarUserMenu />
                </div>
            </nav>
        );
    }
}


export default Navbar;

