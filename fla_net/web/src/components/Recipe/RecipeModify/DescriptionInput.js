import React from 'react';

const DescriptionInput = props => (
    <div className="input-group">
        <span className="input-group-addon">
            <a onClick={props.removeClick}><span
                style={{
                    cursor: 'pointer',
                }}
                className="remove glyphicon glyphicon-remove-sign glyphicon-white" /></a>
            <br /><br /><br /><br />
            <b>{props.orderValue}</b><br /><br />
            <span className="glyphicon glyphicon-pencil" /></span>
        <textarea
            className="form-control"
            rows="5"
            name="content"
            value={props.contentValue}
            onChange={props.handleInputChange} />
    </div>
);

export default DescriptionInput;
