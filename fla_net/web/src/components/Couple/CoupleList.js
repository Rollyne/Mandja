import React from 'react';
import { Badge, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

import alt from '../../alt';
import CoupleStore from '../../stores/CoupleStore';
import CoupleActions from '../../actions/CoupleActions';
import CoupleCard from './CoupleCard';
import TextGroup from '../BaseForm/TextGroup';
import Auth from '../../Auth';

class CoupleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = CoupleStore.getState();
        this.state.addCoupleOpen = false;

        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        CoupleStore.listen(this.onChange);

        CoupleActions.getUserCouples();
    }

    componentWillUnmount() {
        CoupleStore.unlisten(this.onChange);
        alt.recycle(CoupleStore);
    }

    toggle() {
        this.setState({
            addCoupleOpen: !this.state.addCoupleOpen,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.state.addCoupleOpen = false;

        const title = this.state.newCoupleTitle;

        if (!title || title.length < 3) {
            CoupleActions.commentContentValidationFail();
            return;
        }

        CoupleActions.addCouple({
            title,
        });
    }

    render() {
        let couples = null;
        let couplesLength = 0;
        if (typeof this.state.couples !== 'undefined') {
            if (this.state.couples.length > 0) {
                couples = this.state.couples.map((couple, index) =>
                (<CoupleCard
                    key={couple.id}
                    couple={couple}
                    index={index}
                    removeClick={() => CoupleActions.removeCouple(couple.id, index)} />));
                couplesLength = couples.length;
            }
        }

        const addButton = Auth.isUserAuthenticated() ? (
            <ButtonDropdown isOpen={this.state.addCoupleOpen} toggle={this.toggle}>
                <DropdownToggle caret color="info">
                    <span className="glyphicon glyphicon-plus" />
                    <span> Add Couple</span>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>
                        <form onSubmit={this.handleSubmit}>
                            <TextGroup
                                name="title"
                                label="Title"
                                type="text"
                                handleChange={CoupleActions.handleNewCoupleTitleChange}
                                value={this.state.newCoupleTitle} />
                        </form>
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>) : null;

        return (
            <div className="container">
                <h3 className="text-center">Your couples <Badge>{couplesLength}</Badge></h3>
                <hr />
                {addButton}
                <br /><br />
                <div>
                    {couples}
                </div>
            </div>
        );
    }

}

export default CoupleList;
