import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardBody, CardSubtitle } from 'reactstrap';

const CoupleCard = props => (
    <div className="animated fadeIn" >
        <Card>
            <CardBody>
                <a onClick={props.removeClick} className="pull-right"><span
                    style={{
                        cursor: 'pointer',
                    }}
                    className="remove glyphicon glyphicon-remove-sign glyphicon-white" /></a>
                <CardTitle><Link to={`couples/${props.couple.id}`}>{props.couple.title}</Link></CardTitle>
                <CardSubtitle>{props.couple.date_published}</CardSubtitle>
                <br />
            </CardBody>
        </Card>
    </div>
        );

export default CoupleCard;
