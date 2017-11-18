import React from 'react';
import { Link } from 'react-router-dom';
import Helpers from './Helpers';

class RecipeCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVotePanel: false,
        };

        this.toggleVotePanel = this.toggleVotePanel.bind(this);
    }

    toggleVotePanel() {
        this.setState(prevState => ({
            showVotePanel: !prevState.showVotePanel,
        }));
    }


    render() {
        const nodes = Helpers.nodesRecipeCard(this.state, this.props, this.toggleVotePanel);
        return (
            <div className="animated fadeIn">
                <div className="media movie">
                    <span className="position pull-left">{this.props.index + 1}</span>
                    <div className="media-body">
                        <h4 className="media-heading">
                            <Link to={`/recipe/${this.props.recipe.id}/${this.props.recipe.title}`}>
                                {this.props.recipe.title}
                            </Link>
                        </h4>
                        <br />
                        <div className="votes">Rating:
                            5
                        </div>
                        <br /><br />
                    </div>
                    { nodes.panelToggles }
                </div>

                { nodes.votePanel }
                <div id="clear" />
            </div>
        );
    }
}

export default RecipeCard;
