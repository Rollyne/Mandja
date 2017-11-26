import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardBody, CardSubtitle } from 'reactstrap';

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
        return (
            <div className="animated fadeIn" style={{ display: 'inline-block', width: '30%', margin: '5px' }}>
                <Card style={{ }}>
                    <CardImg top style={{ width: '100%' }} src={this.props.recipe.images.length > 0 ? this.props.recipe.images[0].picture : null} />
                    <CardBody>
                        <CardTitle><Link to={`recipes/${this.props.recipe.id}`}>{this.props.recipe.title}</Link></CardTitle>
                        <CardSubtitle>{this.props.recipe.date_published}</CardSubtitle>
                        <br />
                        <CardSubtitle>Author: <Link to="">{this.props.recipe.author.user.username}</Link></CardSubtitle>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default RecipeCard;
