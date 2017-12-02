import React from 'react';
import DescriptionInput from './DescriptionInput';

function InstructionInputGroup(props) {
    const instructions = [];

    for (let i = 0; i < props.recipe.descriptions.length; i += 1) {
        instructions.push(
            <DescriptionInput
                key={i}
                removeClick={() => props.removeClick(i, 'descriptions')}
                handleInputChange={e => props.handleDescriptionContentChange(i, e.target.value)}
                contentValue={props.recipe.descriptions[i].content}
                orderValue={i + 1} />,
            );
    }

    return (<div>
        <br />
        {instructions}
        <br />
        <button
            type="button"
            className="btn btn-success btn-sm pull-right"
            onClick={() => props.addClick('descriptions')}>
            <span className="glyphicon glyphicon-plus" />
            <span>Add Instruction</span>
        </button>
        <br />
    </div>);
}

export default InstructionInputGroup;
