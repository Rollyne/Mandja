import React from 'react';

const CommentCard = props => (
    <div className="media mb-4 well animated fadeIn">
        <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
        <div className="media-body">
            <h5 className="mt-0">{props.comment.author}</h5>
            <h6 className="mt-0">{props.comment.date_published}</h6>
            {props.comment.content}
            {props.childrenComments}
        </div>
    </div>
);

export default CommentCard;
