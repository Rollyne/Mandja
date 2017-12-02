import React from 'react';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';


function RecipeDetailInput(props) {
    let categoryOptions = [];
    if (typeof props.categoryOptions !== 'undefined') {
        if (props.categoryOptions.length > 0) {
            categoryOptions = props
            .categoryOptions.map(category => ({ label: category.name, value: category.id }));
        }
    }
    return (
        <div>
            <br />
            <div>Region</div>
            <Select
                name="region"
                onChange={props.handleRegionInputChange}
                options={props.regions}
                value={props.recipe.region} />
            <br />
            <div>Category</div>
            <Select
                name="category"
                onChange={props.handleCategoryInputChange}
                options={categoryOptions}
                value={props.recipe.category.id} />
            <br />
            <div>Servings</div>
            <NumericInput
                name="servings"
                min={1}
                value={props.recipe.servings}
                className="form-control"
                onChange={props.handleServingsInputChange} />
            <hr />
        </div>
    );
}

export default RecipeDetailInput;
