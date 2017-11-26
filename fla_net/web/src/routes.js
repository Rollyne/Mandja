import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import RecipeAdd from './components/Recipe/RecipeAdd';
import UserProfile from './components/User/UserProfile';
import PrivateRoute from './components/common/PrivateRoute';
import UserRegister from './components/User/UserRegister';
import UserLogin from './components/User/UserLogin';
import RecipeDetail from './components/Recipe/RecipeDetail';


const Routes = () => (
    <Switch>

        <Route exact path="/" component={Home} />
        <PrivateRoute path="/recipes/add" component={RecipeAdd} />
        <Route path="/register" component={UserRegister} />
        <Route path="/login" component={UserLogin} />
        <Route path="/recipes/:id" component={RecipeDetail} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <Route component={NotFound} />
    </Switch>
);


export default Routes;
