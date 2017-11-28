import React from 'react';
import { Link } from 'react-router-dom';
import RecipeRating from './RecipeRating';
// import { Card, CardImg, CardTitle, CardBody, CardSubtitle } from 'reactstrap';

const RecipeCard = props => (

    <div className="eventWrapper animated fadeInUp">
        <RecipeRating />
        <div
            className="eventImage"
            style={{
                backgroundImage: `url(${
                    props.recipe.images.length > 0 ?
                        props.recipe.images[0].picture.replace('/', '/api/')
                        : null})`,
            }} />
        <div className="eventDetails">


            <h3 className="eventHeader">
                <span>
                    <Link to={`recipes/${props.recipe.id}`}>{props.recipe.title}</Link>
                </span>
            </h3>

            <p className="eventDesc">
                    Author: <Link to={`/profile/${props.recipe.author.id}`}>{props.recipe.author.user.username}</Link>
                <div className="eventDate"><span>{props.recipe.date_published}</span></div>
            </p>
            {/* <!--<footer className="eventPlace">--> */}
            {/* <!--<span>гр.Карлово, Централен Балкан</span>--> */}
            {/* <!--</footer>--> */}
            {/* <!--<footer className="eventTags">--> */}
            {/* <!--#Balkan #GrillAndBeer--> */}
            {/* <!--</footer>--> */}
        </div>
    </div>);

/* <div classNameName="animated fadeIn"> */
/* <Card style={{ }}> */
/* <CardImg top style={{ width: '100%' }}
src={props.recipe.images.length > 0 ? props.recipe.images[0].picture : null} /> */
/* <CardBody> */
/* <CardTitle><Link to={`recipes/${props.recipe.id}`}>{props.recipe.title}</Link></CardTitle> */
/* <CardSubtitle>{props.recipe.date_published}</CardSubtitle> */
/* <br /> */
/* <CardSubtitle>Author: <Link to="">{props.recipe.author.user.username}</Link></CardSubtitle> */
/* </CardBody> */
/* </Card> */
/* </div> */


export default RecipeCard;
