import toastr from 'toastr';
import alt from '../../alt';
import RecipeActions from '../../actions/Recipe/RecipeDetailActions';

class RecipeDetailStore {
    constructor() {
        this.bindActions(RecipeActions);
        this.activeIndex = 0;
        this.recipe = {
            author: {
                user: {},
                profile: {},
            },
            // descriptions: [{}],
            // ingredients: [{}],
            // images: [{}],
            // comments: [{
            //     author: {
            //         user: {},
            //         account: {},
            //     },
            // }],
        };

        this.content = '';
        this.substitutes = {};
    }

    onGetRecipeSuccess(recipe) {
        this.recipe = recipe;
        console.log(recipe);
    }

    onGetRecipeFail(error) {
        toastr.error(error);
    }

    onPostCommentSuccess(comment) {
        toastr.success('The comment was successfully posted.');
        this.content = '';
        this.recipe.comments.unshift(comment);
    }

    onPostCommentFail(error) {
        console.log(error);
        toastr.error(error);
    }

    onHandleInputChange(e) {
        const target = e.target;
        this.content = target.value;
    }

    onCommentContentValidationFail() {
        toastr.warning('Your comment should be at least 3 symbols long.');
    }

    onGetRecipeCommentsSuccess(comments) {
        this.recipe.comments = comments;
    }

    onGetRecipeCommentsFail(error) {
        toastr.error(error);
    }

    onGetSubstitutesSuccess(substitutes) {
        this.substitutes = substitutes;
    }
    onGetSubstitutesFail(error) {
        toastr.error(error);
    }

    onRemoveRecipeSuccess() {
        toastr.success('Removed successfully');
    }

    onRemoveRecipeFail(error) {
        console.log(error.detail);
        toastr.warning(error);
    }

    onRemoveCommentSuccess(index) {
        delete this.recipe.comments[index];
        toastr.success('Comment removed');
    }

    onRemoveCommentFail(error) {
        toastr.warning(error.detail);
    }
}

export default alt.createStore(RecipeDetailStore);
