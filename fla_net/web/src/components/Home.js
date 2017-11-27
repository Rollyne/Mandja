import React from 'react';

import alt from '../alt';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import RecipeCard from './Recipe/RecipeCard';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = HomeStore.getState();

        this.onChange = this.onChange.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        HomeStore.listen(this.onChange);

        HomeActions.getLatestRecipes();
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
        alt.recycle(HomeStore);
    }

    render() {
        const recipes = this.state.latestRecipes.map((recipe, index) =>
            (<RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index} />));
        return (
            <div className="container">
                <h3 className="text-center">Welcome to
                    <strong> Mandja</strong>
                </h3>
                <div>
                    {this.state.error}
                    {recipes}
                </div>
            </div>
        );
    }

}

export default Home;
