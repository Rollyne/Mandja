import React from 'react';
import 'react-select/dist/react-select.css';
import ImagesUploader from 'react-images-upload';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

import RecipeModifyStore from '../../../stores/Recipe/RecipeModifyStore';
import RecipeModifyActions from '../../../actions/Recipe/RecipeModifyActions';
import Submit from '../../BaseForm/Submit';
import alt from '../../../alt';
import RecipeInfoInput from './RecipeInfoInput';
import IngredientInputGroup from './IngredientInputGroup';
import InstructionInputGroup from './InstructionInputGroup';
import RecipeDetailInput from './RecipeDetailInput';


export default class RecipeModify extends React.Component {
    constructor(props) {
        super(props);

        this.state = RecipeModifyStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIngredientAddSubmit = this.handleIngredientAddSubmit.bind(this);
        this.loadIngredientNames = this.loadIngredientNames.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        RecipeModifyStore.listen(this.onChange);
        RecipeModifyActions.getRecipeForModification(this.props.match.params.id);
    }

    componentWillUnmount() {
        RecipeModifyStore.unlisten(this.onChange);
        alt.recycle(RecipeModifyStore);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e);

        const title = this.state.recipe.title.trim();
        if (!title) {
            RecipeModifyActions.titleValidationFail();
        }
        if (title) {
            const data = {
                title: this.state.recipe.title,
                cooking_time: this.state.recipe.cookingTime,
                hands_on_time: this.state.recipe.handsOnTime,
                ingredients: this.state.recipe.ingredients,
                descriptions: this.state.recipe.descriptions.map((element, i) => ({
                    content: element.content,
                    order: i + 1,
                }),
                ),
                images: this.state.recipe.images,
                category: this.state.recipe.category,
                region: this.state.recipe.region,
                servings: this.state.recipe.servings,
            };
            console.log(data);
            if (RecipeModifyActions.addRecipe(data, this.props.match.params.id)) {
                this.props.history.push('/recipes');
            }
        }
    }

    handleIngredientAddSubmit(e) {
        e.preventDefault();

        if (RecipeModifyActions.addCustomIngredient(this.state.newIngredient)) {
            this.state.newIngredient.name = '';
            RecipeModifyActions.toggleIngredientAdd();
        }
    }

    loadIngredientNames() {
        const ingredientNames = [];
        if (typeof this.state.recipe.ingredients.length !== 'undefined') {
            if (this.state.recipe.ingredients.length > 0) {
                const ingredients = Object.keys(this.state.recipe.ingredients)
                .map(idx => this.state.ingredientOptions.find(
                    ingr => ingr.id === this.state.recipe.ingredients[idx].ingredient_id,
                ));


                for (let i = 0; i < ingredients.length; i += 1) {
                    if (typeof ingredients[i] !== 'undefined') {
                        if (ingredients[i].name.length > 0) {
                            ingredientNames.push(ingredients[i].name);
                        }
                    }
                }
            }
        }
        return ingredientNames;
    }


    render() {
        return (
            <div className="container">
                <div className="row flipInX animated">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">Add Recipe</div>
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div>
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === '1' ? 'active pointer' : 'pointer'}
                                                    onClick={() => {
                                                        RecipeModifyActions.toggleTab('1');
                                                    }}>
                                                    Info
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === '2' ? 'active pointer' : 'pointer'}
                                                    onClick={() => {
                                                        RecipeModifyActions.toggleTab('2');
                                                        RecipeModifyActions
                                                            .getIngredientOptions(this.state.ingredientOptions.length);
                                                    }}>
                                                    Ingredients
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === '3' ? 'active pointer' : 'pointer'}
                                                    onClick={() => {
                                                        RecipeModifyActions.toggleTab('3');
                                                    }}>
                                                    Instructions
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === '4' ? 'active pointer' : 'pointer'}
                                                    onClick={() => {
                                                        RecipeModifyActions.toggleTab('4');
                                                        RecipeModifyActions
                                                            .getCategoryOptions(this.state.categoryOptions.length);
                                                        RecipeModifyActions
                                                            .getRegionClassification(this.loadIngredientNames());
                                                    }}>
                                                    Details
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === '5' ? 'active pointer' : 'pointer'}
                                                    onClick={() => {
                                                        RecipeModifyActions.toggleTab('5');
                                                    }}>
                                                    Images
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab={this.state.activeTab}>
                                            <TabPane className="animated fadeInUp" tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <RecipeInfoInput
                                                            handleInputChange={RecipeModifyActions.handleInputChange}
                                                            recipe={this.state.recipe} />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane className="animated fadeInUp" tabId="2">
                                                <Row>
                                                    <Col sm="12">
                                                        <IngredientInputGroup
                                                            ingredientAdd={this.state.ingredientAdd}
                                                            newIngredient={this.state.newIngredient}
                                                            recipe={this.state.recipe}
                                                            handleQuantityInputChange={RecipeModifyActions
                                                                .handleQuantityInputChange}
                                                            handleIngredientInputChange={RecipeModifyActions
                                                                .handleIngredientInputChange}
                                                            handleUnitInputChange={RecipeModifyActions
                                                                .handleUnitInputChange}
                                                            removeClick={RecipeModifyActions.removeClick}
                                                            ingredientOptions={this.state.ingredientOptions}
                                                            toggleIngredientAdd={RecipeModifyActions
                                                                .toggleIngredientAdd}
                                                            handleAddIngredientInputChange={RecipeModifyActions
                                                                .handleAddIngredientInputChange}
                                                            addClick={RecipeModifyActions.addClick} />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane className="animated fadeInUp" tabId="3">
                                                <Row>
                                                    <Col sm="12">
                                                        <InstructionInputGroup
                                                            addClick={RecipeModifyActions.addClick}
                                                            removeClick={RecipeModifyActions.removeClick}
                                                            handleDescriptionContentChange={
                                                                RecipeModifyActions.handleDescriptionContentChange}
                                                            recipe={this.state.recipe} />
                                                    </Col>
                                                </Row>
                                            </TabPane>

                                            <TabPane className="animated fadeInUp" tabId="4">
                                                <Row>
                                                    <Col sm="12">
                                                        <RecipeDetailInput
                                                            regions={this.state.regions}
                                                            handleInputChange={RecipeModifyActions.handleInputChange}
                                                            handleRegionInputChange={RecipeModifyActions
                                                                .handleRegionInputChange}
                                                            handleCategoryInputChange={RecipeModifyActions
                                                                .handleCategoryInputChange}
                                                            handleServingsInputChange={RecipeModifyActions
                                                                .handleServingsInputChange}
                                                            recipe={this.state.recipe}
                                                            categoryOptions={this.state.categoryOptions} />
                                                    </Col>
                                                </Row>
                                            </TabPane>

                                            <TabPane className="animated fadeInUp" tabId="5">
                                                <Row>
                                                    <Col sm="12">
                                                        <ImagesUploader
                                                            accept="image/*"
                                                            name="images"
                                                            buttonText="Choose images"
                                                            onChange={RecipeModifyActions.imageDrop}
                                                            imgExtension={['.jpg', '.JPG', '.gif', '.GIF', '.png', '.PNG']}
                                                            maxFileSize={5242880} />
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                    <Submit />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
