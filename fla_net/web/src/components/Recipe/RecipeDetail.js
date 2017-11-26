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
import SubstitutesModal from './SubstitutesModal';

const items = [
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 1',
        caption: 'Slide 1',
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 2',
        caption: 'Slide 2',
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 3',
        caption: 'Slide 3',
    },
];

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
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
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
                            key={i}
                            quantity={ingredients[i].quantity}
                            unit={ingredients[i].unit}
                            ingredient={ingredients[i].ingredient_name.replace('_', ' ')} />
                    )));
            }
        }

        return (
            <ul className="list-group">
                {rendered}
                <SubstitutesModal />
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
                    src={item.picture}
                    altText=""
                    interval="false"
                    data-interval="false" />));

                return (<Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                    autoPlay={false}>
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
                    <p>{this.state.recipe.date_published}</p>
                    <hr />
                    <h3 className="mt-0">Ingredients</h3>
                    {this.renderIngredients(this.state.recipe.ingredients)}
                    <hr />
                    <h3 className="mt-0">Descriptions</h3>
                    {this.renderDescriptions(this.state.recipe.descriptions)}
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
