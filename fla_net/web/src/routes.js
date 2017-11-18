import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import RecipeAdd from './components/Recipe/RecipeAdd';
import UserProfile from './components/UserProfile';
import PrivateRoute from './components/common/PrivateRoute';


const Routes = () => (
    <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/recipes/add" component={RecipeAdd} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <Route component={NotFound} />
    </Switch>
);


export default Routes;
