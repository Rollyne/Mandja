import React from 'react';
import IngredientAddModal from './IngredientAddModal';
import IngredientInput from './IngredientInput';

function IngredientInputGroup(props) {
    const ingredients = [];
    const ingredientOptions = props
            .ingredientOptions.map(ingredient => ({ label: ingredient.name.split('_').join(' '), value: ingredient.id }));
    for (let i = 0; i < props.recipe.ingredients.length; i += 1) {
        ingredients.push(
            <IngredientInput
                key={i}
                removeClick={() => props.removeClick(i, 'ingredients')}
                handleQuantityInputChange={value => props.handleQuantityInputChange(i, value)}
                handleIngredientInputChange={value => props.handleIngredientInputChange(i, value)}
                handleUnitInputChange={value => props.handleUnitInputChange(i, value)}
                options={ingredientOptions}
                quantityValue={props.recipe.ingredients[i].quantity}
                unitValue={props.recipe.ingredients[i].unit}
                ingredientValue={props.recipe.ingredients[i].ingredient_id}
                toggleIngredientAdd={props.toggleIngredientAdd} />,
            );
    }

    return (<div>
        <IngredientAddModal
            toggle={props.toggleIngredientAdd}
            show={props.ingredientAdd}
            handleChange={props.handleAddIngredientInputChange}
            ingredient={props.newIngredient}
            ingredientSubmit={props.handleIngredientAddSubmit} />
        <br />
        {ingredients}
        <br />
        <button
            type="button"
            className="btn btn-success btn-sm pull-right"
            onClick={() => props.addClick('ingredients')}>
            <span className="glyphicon glyphicon-plus" />
            <span>Add Ingredient</span>
        </button>
    </div>);
}

export default IngredientInputGroup;
