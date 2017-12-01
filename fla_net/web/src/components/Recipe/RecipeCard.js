import React from 'react';
import { Link } from 'react-router-dom';
import RecipeRating from './RecipeRating';
// import { Card, CardImg, CardTitle, CardBody, CardSubtitle } from 'reactstrap';

function RecipeCard(props) {
    return (

        <div className="eventWrapper animated fadeInUp">
            <RecipeRating />
            <Link to={`recipes/${props.recipe.id}`}><div
                className="eventImage"
                style={{
                    backgroundImage: `url(${
                        props.recipe.images.length > 0 ?
                            props.recipe.images[0].picture
                            : null})`,
                }} /></Link>
            <div className="eventDetails">
                <h3 className="eventHeader">
                    <span>
                        <Link to={`recipes/${props.recipe.id}`}>{props.recipe.title}</Link>
                    </span>
                </h3>

                <p className="eventDesc">
                    Author: <Link to={`/profile/${props.recipe.author.id}`}>{props.recipe.author.user.username}</Link>
                    <span style={{ display: 'block' }} className="eventDate"><span>{props.recipe.date_published}</span></span>
                </p>
            </div>
        </div>);
}


export default RecipeCard;
