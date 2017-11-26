import React from 'react';

const DescriptionCard = props => (
    <div className="input-group">
        <span className="input-group-addon">
            <b>{props.order}</b></span>
        <div
            className="well"
            style={{
                marginBottom: 0,
            }}>{props.content}</div>
    </div>
);

export default DescriptionCard;
