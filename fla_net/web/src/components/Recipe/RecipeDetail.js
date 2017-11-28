import React, { Component } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';
import CommentForm from './CommentForm';
import IngredientCard from './IngredientCard';
import DescriptionCard from './DescriptionCard';
import alt from '../../alt';
import RecipeDetailStore from '../../stores/Recipe/RecipeDetailStore';
import RecipeDetailActions from '../../actions/Recipe/RecipeDetailActions';
import CommentCard from './CommentCard';

class RecipeDetail extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.state = RecipeDetailStore.getState();
        this.onChange = this.onChange.bind(this);
        this.renderIngredients = this.renderIngredients.bind(this);
        this.renderDescriptions = this.renderDescriptions.bind(this);
        this.renderImages = this.renderImages.bind(this);
        this.renderComments = this.renderComments.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        RecipeDetailStore.listen(this.onChange);
        RecipeDetailActions.getRecipe(this.props.match.params.id);
    }

    componentWillUnmount() {
        RecipeDetailStore.unlisten(this.onChange);
        alt.recycle(RecipeDetailStore);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.recipe.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.recipe.images.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }


    renderIngredients(ingredients) {
        const rendered = [];
        if (typeof ingredients !== 'undefined') {
            if (ingredients.length > 0) {
                Object.keys(ingredients).map(i =>
                    rendered.push((
                        <IngredientCard
                            getSubstitutes={RecipeDetailActions.getIngredientSubstitutes}
                            substitutes={this.state.substitutes}
                            key={ingredients[i].ingredient_id}
                            quantity={ingredients[i].quantity}
                            unit={ingredients[i].unit}
                            ingredient={ingredients[i].ingredient_name.replace('_', ' ')} />
                    )));
            }
        }

        return (
            <ul className="list-group">
                {rendered}
            </ul>
        );
    }

    renderDescriptions(descriptions) {
        const rendered = [];
        if (typeof descriptions !== 'undefined') {
            if (descriptions.length > 0) {
                Object.keys(descriptions).map(i =>
                    rendered.push((<DescriptionCard
                        key={i}
                        content={descriptions[i].content}
                        order={descriptions[i].order} />
                    )));
            }
        }
        return rendered;
    }


    renderImages(images) {
        if (typeof images !== 'undefined') {
            if (images.length > 0) {
                let controls = null;
                const isSingle = images.length === 1;
                if (!isSingle) {
                    controls = (<div>
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </div>);
                }


                const slides = images.map(item => (<CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.picture}
                    src={item.picture.picture.replace('/', '/api/')}
                    altText=""
                    interval="false"
                    data-interval="false" />));

                return (<Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                    autoPlay={false}
                    interval={false}>
                    <CarouselIndicators
                        items={this.state.recipe.images}
                        activeIndex={this.state.activeIndex}
                        onClickHandler={this.goToIndex} />
                    {slides}
                    {controls}


                </Carousel>);
            }
        }
        return null;
    }

    renderComments(comments) {
        const rendered = [];
        if (typeof comments !== 'undefined') {
            const sorted = comments;// comments.sort((kv1, kv2) => kv1[1] - kv2[1]);
            if (sorted.length > 0) {
                Object.keys(sorted).map(i =>
                    rendered.push((<CommentCard key={i} comment={sorted[i]} />
                    )));
            }
        }

        return rendered;
    }

    render() {
        return (
            <div className="animated fadeIn">
                {this.renderImages(this.state.recipe.images)}

                <div className="container">
                    <h1 className="mt-4">{this.state.recipe.title}</h1>
                    <p className="lead">
                        by
                        <a href=""> {this.state.recipe.author.user.username}</a>
                    </p>
                    <p><small>{this.state.recipe.date_published}</small></p>
                    <hr />
                    <div className="well">
                        <h3 className="mt-0">Details</h3>
                        <hr />
                        <ul className="list-group">
                            Overall time
                            <li className="justify-content-between input-group">
                                <span alt="Hands on time" className="input-group-addon"><span className="glyphicon glyphicon-dashboard" /></span>
                                <div className="form-control">{this.state.recipe.hands_on_time + this.state.recipe.cooking_time} minutes</div>
                            </li>
                            <br />
                            Hands on time
                            <li className="justify-content-between input-group">
                                <span alt="Hands on time" className="input-group-addon"><span className="fa fa-hand-spock-o" /></span>
                                <div className="form-control">{this.state.recipe.hands_on_time} minutes</div>
                            </li>
                            <br />
                            Cooking time
                            <li className="justify-content-between input-group">
                                <span className="input-group-addon"><span className="glyphicon glyphicon-fire" /></span>
                                <div className="form-control">{this.state.recipe.cooking_time} minutes</div>
                            </li>
                        </ul>
                    </div>
                    <div className="well">
                        <h3 className="mt-0">Ingredients</h3>
                        {this.renderIngredients(this.state.recipe.ingredients)}
                    </div>
                    <hr />
                    <div className="well">
                        <h3 className="mt-0">Instructions</h3>
                        {this.renderDescriptions(this.state.recipe.descriptions)}
                    </div>
                </div>
                <hr />
                <div className="container">

                    <div className="card my-4">
                        <h5 className="card-header">Leave a Comment:</h5>

                        <CommentForm recipeId={this.state.recipe.id} />
                    </div>
                    {this.renderComments(this.state.recipe.comments)}
                </div>
            </div>
        );
    }
}


export default RecipeDetail;
