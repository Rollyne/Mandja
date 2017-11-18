import React from 'react';
import RecipeAddStore from '../../stores/Recipe/RecipeAddStore';
import RecipeAddActions from '../../actions/Recipe/RecipeAddActions';


export default class AddRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = RecipeAddStore.getState();

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        RecipeAddStore.listen(this.onChange);
    }

    componentWillUnmount() {
        RecipeAddStore.unlisten(this.onChange);
    }

    handleSubmit(e) {
        e.preventDefault();
        const title = this.state.recipe.title.trim();
        // let ingredients = this.state.ingredients;
        if (!title) {
            RecipeAddActions.titleValidationFail();
        }
        // if (ingredients.length === 0) {
        //     this.setState({
        //         ingredientsValidationState: 'has-error',
        //         helpBlock: 'Please add ingredients!'
        //     });
        // }
        // if(descriptions.length === 0){
        //     this.setState({
        //         descriptionsValidationState: 'has-error',
        //         helpBlock: 'Please add descriptions!'
        //     })
        // }

        if (title) {
            const data = {
                title: this.state.recipe.title,
                cooking_time: this.state.recipe.cookingTime,
                hands_on_time: this.state.recipe.handsOnTime,
            };
            RecipeAddActions.addRecipe(data);
        }
    }

    // handleIngredientsChange(e) {
    //     let ingredientValue = e.target.value;
    //     console.log('RecipeAdd state', this.state);
    //     if (this.state.ingredients.indexOf(ingredientValue) === -1) {
    //         this.setState(prevState => ({
    //             ingredients: Helpers.appendToArray(ingredientValue, prevState.ingredients)
    //         }));
    //     } else {
    //         this.setState(prevState => ({
    //             ingredients: Helpers.removeFromArray(ingredientValue, prevState.ingredients)
    //         }));
    //     }
    // }
    //
    // handleDescriptionsChange(e) {
    //     let descriptionValue = e.target.value;
    //     console.log('RecipeAdd state', this.state);
    //     if (this.state.descriptions.indexOf(descriptionValue) === -1) {
    //         this.setState(prevState => ({
    //             descriptions: Helpers.appendToArray(descriptionValue, prevState.descriptions)
    //         }));
    //     } else {
    //         this.setState(prevState => ({
    //             descriptions: Helpers.removeFromArray(descriptionValue, prevState.descriptions)
    //         }));
    //     }
    // }

    render() {
        return (
            <div className="container">
                <div className="row flipInX animated">
                    <div className="col-sm-8">
                        <div className="panel panel-default">
                            <div className="panel-heading">Add Recipe</div>
                            <div className="panel-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className={`form-group ${this.state.titleValidationState}`}>
                                        <label className="control-label" htmlFor="title">Title</label>
                                        <input
                                            name="title"
                                            id="title"
                                            type="text"
                                            className="form-control"
                                            value={this.state.title}
                                            onChange={RecipeAddActions.handleInputChange} />
                                        <span className="help-block">{this.state.helpBlock}</span>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="ct">Cooking time</label>
                                        <input
                                            name="cookingTime"
                                            id="ct"
                                            type="text"
                                            className="form-control"
                                            value={this.state.cookingTime}
                                            onChange={RecipeAddActions.handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label" htmlFor="hot">Hands on time</label>
                                        <input
                                            name="handsOnTime"
                                            id="hot"
                                            type="text"
                                            className="form-control"
                                            value={this.state.handsOnTime}
                                            onChange={RecipeAddActions.handleInputChange} />
                                    </div>

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
