import React from 'react';
import SubstitutesModal from './SubstitutesModal';

class IngredientCard extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    render() {
        return (
            <a onClick={this.toggle} style={{ cursor: 'pointer' }}>
                <li className="justify-content-between input-group">
                    <span className="input-group-addon">{this.props.quantity}</span>
                    <span className="input-group-addon">{this.props.unit}</span>
                    <div className="form-control">{this.props.ingredient}</div>

                    <SubstitutesModal show={this.state.modal} toggle={this.toggle} ingredient={this.props.ingredient} />
                </li>
            </a>
        );
    }
}


export default IngredientCard;
