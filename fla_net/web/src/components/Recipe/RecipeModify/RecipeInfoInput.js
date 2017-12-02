import React from 'react';
import TextGroup from '../../BaseForm/TextGroup';

function RecipeInfoInput(props) {
    return (
        <div>
            <TextGroup
                type="text"
                value={props.recipe.title}
                label="Title"
                handleChange={props.handleInputChange}
                message={props.message}
                name="title"
                validationState={props.titleValidationState} />
            <TextGroup
                type="text"
                value={props.recipe.cookingTime}
                label="Cooking time"
                handleChange={props.handleInputChange}
                message={props.message}
                name="cookingTime" />

            <TextGroup
                type="text"
                value={props.recipe.handsOnTime}
                label="Hands on time"
                handleChange={props.handleInputChange}
                message={props.message}
                name="handsOnTime" />
        </div>
    );
}

export default RecipeInfoInput;
