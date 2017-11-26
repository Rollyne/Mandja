import React from 'react';

const Form = props => (
    <div className="container">
        <div className="row flipInX animated">
            <div className="col-sm-8">
                <div className="panel panel-default">
                    <div className="panel-heading">{ props.title }</div>
                    <div className="panel-body">
                        <form onSubmit={props.handleSubmit}>
                            <div className={`form-group ${props.submitState}`}>
                                <span className={'help-block'}>{ props.message }</span>
                            </div>
                            { props.children }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

export default Form;
