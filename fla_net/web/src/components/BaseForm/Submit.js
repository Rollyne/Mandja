import React from 'react';

const Submit = props => (
    <input type="submit" className={`btn ${props.type} btn-primary`} value={props.value} />
);

export default Submit;
