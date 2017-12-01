import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import RecipeModify from './components/Recipe/RecipeModify/RecipeModify';
import UserProfile from './components/User/UserProfile';
import PrivateRoute from './components/common/PrivateRoute';
import UserRegister from './components/User/UserRegister';
import UserLogin from './components/User/UserLogin';
import RecipeDetail from './components/Recipe/RecipeDetail';
import CoupleList from './components/Couple/CoupleList';
import CoupleDetail from './components/Couple/CoupleDetail';
import RecipeList from './components/Recipe/RecipeList';


const Routes = () => (
    <Switch>

        <Route exact path="/" component={Home} />
        <PrivateRoute path="/recipes/add" component={RecipeModify} />
        <Route path="/recipes/edit/:id" component={RecipeModify} />
        <Route path="/recipes/:id" component={RecipeDetail} />
        <Route path="/recipes" component={RecipeList} />
        <Route path="/register" component={UserRegister} />
        <Route path="/login" component={UserLogin} />
        <Route path="/profile/:id" component={UserProfile} />
        <PrivateRoute path="/couples/:id" component={CoupleDetail} />
        <PrivateRoute path="/couples" component={CoupleList} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <Route component={NotFound} />
    </Switch>
);


export default Routes;
