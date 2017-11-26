import React from 'react';
import Submit from '../BaseForm/Submit';
import RecipeDetailStore from '../../stores/Recipe/RecipeDetailStore';
import alt from '../../alt';
import RecipeDetailActions from '../../actions/Recipe/RecipeDetailActions';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = RecipeDetailStore.getState();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        RecipeDetailStore.listen(this.onChange);
    }

    componentWillUnmount() {
        RecipeDetailStore.unlisten(this.onChange);
        alt.recycle(RecipeDetailStore);
    }

    handleSubmit(e) {
        e.preventDefault();

        const content = this.state.content;

        if (!content || content.length < 3) {
            RecipeDetailActions.commentContentValidationFail();
            return;
        }

        RecipeDetailActions.postComment({
            content,
        }, this.props.recipeId);
    }

    render() {
        return (
            <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            rows="3"
                            value={this.state.content}
                            onChange={RecipeDetailActions.handleInputChange} />
                    </div>
                    <Submit value="Submit" />
                </form>
            </div>
        );
    }
}

export default CommentForm;
