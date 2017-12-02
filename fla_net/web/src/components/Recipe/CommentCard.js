import React from 'react';
import { Input } from 'reactstrap';

function CommentCard(props) {
    const modifyButtons = props.comment.is_owner ? (<div>

        {/* <a */}
        {/* onClick={props.toggleEdit} */}
        {/* className="pull-right"><span */}
        {/* style={{ */}
        {/* cursor: 'pointer', */}
        {/* }} */}
        {/* className="remove glyphicon glyphicon-pencil glyphicon-white" /></a> */}
        {/* <br /><br /> */}

        <a onClick={props.removeClick} className="pull-right"><span
            style={{
                cursor: 'pointer',
            }}
            className="remove glyphicon glyphicon-remove-sign glyphicon-white" /></a>
    </div>) : null;
    return (
        <div className="media mb-4 well animated fadeIn">

            <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />

            <div className="media-body">
                <h5 className="mt-0">{props.comment.author}</h5>
                <h6 className="mt-0">{props.comment.date_published}</h6>
                <form onSubmit={props.handleSubmit}>
                    <Input
                        type="textarea"
                        disabled
                        value={props.comment.content}
                        style={{
                            resize: 'none',
                            cursor: 'auto',
                            backgroundColor: 'rgba(255,255,255,0)',
                            border: props.edit ? '1px solid grey' : 0,
                        }} />
                </form>
                {props.childrenComments}
            </div>
            {modifyButtons}
        </div>
    );
}
export default CommentCard;
