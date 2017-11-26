import React from 'react';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import VirtualizedSelect from 'react-virtualized-select/dist/es/VirtualizedSelect/VirtualizedSelect';

function IngredientInput(props) {
    const unitOptions = [{
        label: 'Kilograms',
        value: 'kg',
    },
    {
        label: 'Mililiters',
        value: 'ml',
    },
    {
        label: 'Grams',
        value: 'g',
    },
    {
        label: 'Liters',
        value: 'l',
    },
    ];

    return (
        <div className="well">
            <a onClick={props.removeClick}><span
                style={{
                    cursor: 'pointer',
                }}
                className="remove glyphicon glyphicon-remove-sign glyphicon-white" /></a>
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Quantity</span>
                <NumericInput
                    name="quantity"
                    min={1}
                    value={props.quantityValue}
                    className="form-control"
                    onChange={props.handleQuantityInputChange} />
            </div>
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Unit</span>
                <Select
                    name="unit"
                    onChange={props.handleUnitInputChange}
                    options={unitOptions}
                    value={props.unitValue} />
            </div>
            <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Ingredient</span>
                <VirtualizedSelect
                    className="group-item"
                    onChange={props.handleIngredientInputChange}
                    value={props.ingredientValue}
                    options={props.options} />
            </div>
        </div>
    );
}

export default IngredientInput;
