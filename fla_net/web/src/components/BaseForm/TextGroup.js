import React from 'react';

const TextGroup = props => (
    <div className={`form-group ${props.validationState}`}>
        <label className="control-label" htmlFor={props.name}>{ props.label }</label>
        <input
            type={props.type}
            className={`form-control ${props.className}`}
            value={props.value}
            onChange={props.handleChange}
            name={props.name}
            id={props.name} />
        <span className="help-block">{ props.message }</span>
    </div>
    );

export default TextGroup;
