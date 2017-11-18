import React from 'react';
import RecipeVotePanel from './RecipeVotePanel';

class Helpers {
    static nodesRecipeCard(state, props, toggleVotePanel) {
        const nodes = {};
        if (state.showVotePanel) {
            nodes.votePanel = <RecipeVotePanel recipeId={props.recipe.id} />;
        }

        nodes.panelToggles = (
            <div className="pull-right btn-group">
                <a
                    className="btn btn-primary"
                    onClick={toggleVotePanel}>
                    { state.showVotePanel ? 'Hide' : 'Vote' }
                </a>
            </div>
        );

        return nodes;
    }
}

export default Helpers;
