import React from 'react';
import 'react-select/dist/react-select.css';
import ImagesUploader from 'react-images-upload';

import RecipeAddStore from '../../stores/Recipe/RecipeAddStore';
import RecipeAddActions from '../../actions/Recipe/RecipeAddActions';
import TextGroup from '../BaseForm/TextGroup';
import Submit from '../BaseForm/Submit';
import IngredientInput from './IngredientInput';
import DescriptionInput from './DescriptionInput';
import alt from '../../alt';


export default class AddRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = RecipeAddStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderIngredients = this.renderIngredients.bind(this);
        this.renderDescriptions = this.renderDescriptions.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        RecipeAddStore.listen(this.onChange);
        RecipeAddActions.getIngredientOptions();
    }

    componentWillUnmount() {
        RecipeAddStore.unlisten(this.onChange);
        alt.recycle(RecipeAddStore);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e);

        const title = this.state.recipe.title.trim();
        if (!title) {
            RecipeAddActions.titleValidationFail();
        }
        console.log(this.state.recipe);
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
            };
            console.log(data);
            RecipeAddActions.addRecipe(data);
        }
        this.props.history.push('/');
    }

    renderIngredients() {
        const ingredients = [];
        const ingredientOptions = this.state
            .ingredientOptions.map(ingredient => ({ label: ingredient.name.replace('_', ' '), value: ingredient.id }));
        for (let i = 0; i < this.state.recipe.ingredients.length; i += 1) {
            ingredients.push(
                <IngredientInput
                    key={i}
                    removeClick={() => RecipeAddActions.removeClick(i, 'ingredients')}
                    handleQuantityInputChange={value => RecipeAddActions.handleQuantityInputChange(i, value)}
                    handleIngredientInputChange={value => RecipeAddActions.handleIngredientInputChange(i, value)}
                    handleUnitInputChange={value => RecipeAddActions.handleUnitInputChange(i, value)}
                    options={ingredientOptions}
                    quantityValue={this.state.recipe.ingredients[i].quantity}
                    unitValue={this.state.recipe.ingredients[i].unit}
                    ingredientValue={this.state.recipe.ingredients[i].ingredient_id} />,
            );
        }
        return ingredients;
    }

    renderDescriptions() {
        const descriptions = [];

        for (let i = 0; i < this.state.recipe.descriptions.length; i += 1) {
            descriptions.push(
                <DescriptionInput
                    key={i}
                    removeClick={() => RecipeAddActions.removeClick(i, 'descriptions')}
                    handleInputChange={e => RecipeAddActions.handleDescriptionContentChange(i, e.target.value)}
                    contentValue={this.state.recipe.descriptions[i].content}
                    orderValue={i + 1} />,
            );
        }
        return descriptions;
    }


    render() {
        return (
            <div className="container">
                <div className="row flipInX animated">
                    <div className="col-sm-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">Add Recipe</div>
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit}>
                                    <TextGroup
                                        type="text"
                                        value={this.state.recipe.title}
                                        label="Title"
                                        handleChange={RecipeAddActions.handleInputChange}
                                        message={this.state.message}
                                        name="title"
                                        validationState={this.state.titleValidationState} />
                                    <TextGroup
                                        type="text"
                                        value={this.state.recipe.cookingTime}
                                        label="Cooking time"
                                        handleChange={RecipeAddActions.handleInputChange}
                                        message={this.state.message}
                                        name="cookingTime" />

                                    <TextGroup
                                        type="text"
                                        value={this.state.recipe.handsOnTime}
                                        label="Hands on time"
                                        handleChange={RecipeAddActions.handleInputChange}
                                        message={this.state.message}
                                        name="handsOnTime" />

                                    <div>Ingredients</div>
                                    <br />
                                    {this.renderIngredients()}
                                    <br />
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm pull-right"
                                        onClick={() => RecipeAddActions.addClick('ingredients')}>
                                        <span className="glyphicon glyphicon-plus" />
                                        <span>Add Ingredient</span>
                                    </button>
                                    <br /><br /><br /><br />
                                    <div>Descriptions</div>
                                    <br />
                                    {this.renderDescriptions()}
                                    <br />
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm pull-right"
                                        onClick={() => RecipeAddActions.addClick('descriptions')}>
                                        <span className="glyphicon glyphicon-plus" />
                                        <span>Add Description</span>
                                    </button>
                                    <br />
                                    <ImagesUploader
                                        accept="image/*"
                                        name="images"
                                        buttonText="Choose images"
                                        onChange={RecipeAddActions.imageDrop}
                                        imgExtension={['.jpg', '.JPG', '.gif', '.GIF', '.png', '.PNG']}
                                        maxFileSize={5242880} />
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
