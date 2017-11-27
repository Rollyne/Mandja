import React from 'react';
import { Button, InputGroup, InputGroupAddon, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import alt from '../../alt';
import RecipeListStore from '../../stores/Recipe/RecipeListStore';
import RecipeListActions from '../../actions/Recipe/RecipeListActions';
import RecipeCard from '../Recipe/RecipeCard';
import TextGroup from '../BaseForm/TextGroup';
import Auth from '../../Auth';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = RecipeListStore.getState();

        this.onChange = this.onChange.bind(this);
        this.renderPagination = this.renderPagination.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    onChange(state) {
        this.setState(state);
    }

    componentDidMount() {
        RecipeListStore.listen(this.onChange);

        RecipeListActions.getRecipes(1);
    }

    componentWillUnmount() {
        RecipeListStore.unlisten(this.onChange);
        alt.recycle(RecipeListStore);
    }

    renderPagination(allItemsCount, itemsPerPage, currentPage) {
        const pages = Math.ceil(allItemsCount / itemsPerPage);
        const items = [];
        if (currentPage - 1 >= 1) {
            items.push(<PaginationItem key="-1" className="pointer">
                <PaginationLink
                    previous
                    onClick={() => RecipeListActions
                        .getRecipes(currentPage - 1, this.state.search)} />
            </PaginationItem>);
        }
        for (let i = 1; i <= pages; i += 1) {
            if (i !== currentPage) {
                items.push((
                    <PaginationItem key={i} className="pointer">
                        <PaginationLink onClick={() => RecipeListActions
                            .getRecipes(i, this.state.search)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                ));
            } else {
                items.push((
                    <PaginationItem key="-2" active className="pointer" >
                        <PaginationLink onClick={() => RecipeListActions
                            .getRecipes(i, this.state.search)}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
            ));
            }
        }

        if (currentPage + 1 <= pages) {
            items.push(<PaginationItem className="pointer">
                <PaginationLink
                    next
                    onClick={() => RecipeListActions
                        .getRecipes(currentPage + 1, this.state.search)} />
            </PaginationItem>);
        }

        return (
            <Pagination>
                {items}
            </Pagination>
        );
    }

    handleSearch(e) {
        e.preventDefault();
        RecipeListActions.getRecipes(1, this.state.search);
    }

    render() {
        const addButton = Auth.isUserAuthenticated() ? (
            <Link to="/recipes/add" className="pull-right">
                <Button color="primary"><span className="glyphicon glyphicon-plus" />
                    <span> Add recipe</span>
                </Button></Link>) : null;

        const recipes = typeof this.state.recipes === 'undefined' ? null : this.state.recipes.map((recipe, index) =>
            (<RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index} />));
        const itemsPerPage = 10;
        return (

            <div className="container">
                <center>{this.renderPagination(this.state.itemsCount, itemsPerPage, this.state.currentPage)}</center>
                <h3 className="text-center">All recipes
                </h3>
                <hr />
                {addButton}
                <br /><br />
                <form onSubmit={this.handleSearch}>
                    <InputGroup>
                        <InputGroupAddon
                            className="glyphicon glyphicon-search" />
                        <TextGroup type="text" name="search" value={this.state.search} handleChange={RecipeListActions.handleSearchChange} />
                    </InputGroup>
                </form>
                <br />

                <br /><br />
                <div>
                    {recipes}
                </div>
                <center>{this.renderPagination(this.state.itemsCount, itemsPerPage, this.state.currentPage)}</center>
            </div>
        );
    }

}

export default RecipeList;
