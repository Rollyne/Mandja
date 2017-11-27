import React from 'react';
import {
    Button,
    Badge,
    Progress,
    ListGroup, ListGroupItem, InputGroupAddon, InputGroup,
} from 'reactstrap';

import alt from '../../alt';
import CoupleActions from '../../actions/CoupleActions';
import CoupleStore from '../../stores/CoupleStore';
import TextGroup from '../BaseForm/TextGroup';


class CoupleDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = CoupleStore.getState();
        this.onChange = this.onChange.bind(this);
        this.renderIngredients = this.renderIngredients.bind(this);
        this.renderIngredientOptions = this.renderIngredientOptions.bind(this);
        this.getRecommendations = this.getRecommendations.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        CoupleStore.listen(this.onChange);
        CoupleActions.getCouple(this.props.match.params.id);
        this.getRecommendations();
    }

    componentWillUnmount() {
        CoupleStore.unlisten(this.onChange);
        alt.recycle(CoupleStore);
    }

    renderIngredientOptions(ingredients) {
        const search = this.state.search;
        const coupleId = this.state.couple.id;
        const result = Object.keys(ingredients).map((key) => {
            if (key.includes(search.split(' ').join('_'))) {
                return (
                    <a key={key} className="pointer" onClick={() => CoupleActions.addIngredient(key, coupleId)}>
                        <ListGroupItem
                            className="animated fadeInUp"
                            style={{
                                backgroundColor: '#2a2d3d',
                                color: 'white',
                                border: '1px solid black',
                            }}>
                            {key.split('_').join(' ')}
                            <Badge>{Math.round(ingredients[key] * 100)}%</Badge>
                            <Progress
                                color="primary"
                                style={{
                                    backgroundColor: '#1d1f2d',
                                }}
                                animated
                                value={ingredients[key] * 100} />
                        </ListGroupItem>
                    </a>);
            }
            return null;
        });
        return result;
    }

    renderIngredients(ingredients) {
        const result = Object.keys(ingredients).map(i => (
            <ListGroupItem
                className="animated fadeInUp"
                style={{
                    'background-color': '#2a2d3d',
                    color: 'white',
                    border: '1px solid black',
                }}
                key={ingredients[i].ingredient_id}>
                {ingredients[i].ingredient_name.replace('_', ' ')}
                <a onClick={() => CoupleActions.removeCoupleIngredient(ingredients[i].id, this.state.couple.id, i)} className="pull-right"><span
                    style={{
                        cursor: 'pointer',
                    }}
                    className="remove glyphicon glyphicon-remove-sign glyphicon-white" /></a>
            </ListGroupItem>));
        return result;
    }

    getRecommendations() {
        const coupleIngredients = this.state.couple.ingredients;
        CoupleActions
            .getIngredientOptions(Object
                .keys(coupleIngredients)
                .map(i => coupleIngredients[i].ingredient_name));
    }


    render() {
        return (
            <div
                className="well animated fadeIn"
                style={{
                    'background-color': '#3b3f51',
                }}>
                <h1 className="dark-title">{this.state.couple.title}</h1>
                <h6 className="dark-subtitle">{this.state.couple.date_published}</h6>
                <hr />
                <Button color="primary" onClick={this.getRecommendations}>Get recommendations</Button>
                <br /><br />
                <InputGroup className="half">
                    <InputGroupAddon
                        className="glyphicon glyphicon-search dark-search " />
                    <TextGroup className="dark-search" type="text" name="search" value={this.state.search} handleChange={CoupleActions.handleSearchChange} />
                </InputGroup>
                <br /><br />
                <div className="flex-space-around">

                    <ListGroup className="dark-list-group overflow-scroll">
                        {this.renderIngredientOptions(this.state.ingredientOptions)}
                    </ListGroup>
                    <ListGroup className="dark-list-group">
                        {this.renderIngredients(this.state.couple.ingredients)}
                    </ListGroup>
                </div>
            </div>
        );
    }
}


export default CoupleDetail;
