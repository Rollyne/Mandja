
import React from 'react'

const RadioElement = (props) => (
        <div className='radio radio-inline'>
            <input type='radio'
                   name={ props.groupName }
                   id={ props.value.toLowerCase() }
                   value={ props.value }
                   checked={ props.selectedValue === props.value }
                   onChange={ props.handleChange }/>
            <label htmlFor={ props.value.toLowerCase() }>{ props.value }</label>
        </div>
    );

export default RadioElement