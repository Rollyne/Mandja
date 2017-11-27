import toastr from 'toastr';
import alt from '../alt';
import CoupleActions from '../actions/CoupleActions';

class CoupleStore {
    constructor() {
        this.bindActions(CoupleActions);
        this.ingredientOptions = [];
        this.couple = {
            ingredients: [],
        };
        this.couples = [];
        this.newCoupleTitle = '';
        this.search = '';
    }


    onGetIngredientOptionsSuccess(ingredients) {
        const ingrs = {};
        Object.keys(ingredients).map(key =>
            ingrs[key] = ingredients[key] / 0.25,
        );
        this.ingredientOptions = ingrs;
    }
    onGetIngredientOptionsFail(error) {
        toastr.error(error);
    }

    onGetCoupleSuccess(couple) {
        this.couple = couple;
    }

    onGetCoupleError(error) {
        toastr.error(error);
    }

    onAddIngredientSuccess(ingredient) {
        this.couple.ingredients.push(ingredient);
    }

    onAddIngredientFail(error) {
        toastr.error(error);
    }

    onGetUserCouplesSuccess(couples) {
        this.couples = couples;
    }

    onGetUserCouplesFail(error) {
        toastr.error(error);
    }

    onHandleNewCoupleTitleChange(e) {
        this.newCoupleTitle = e.target.value;
    }

    onHandleSearchChange(e) {
        this.search = e.target.value;
    }

    onAddCoupleSuccess(couple) {
        this.couples.unshift(couple);
    }

    onAddCoupleFail(error) {
        toastr.error(error);
    }

    onRemoveCoupleSuccess(index) {
        delete this.couples[index];
        toastr.success('Successfully removed couple.');
    }

    onRemoveCoupleFail(error) {
        toastr.error(error);
    }

    onRemoveCoupleIngredientSuccess(index) {
        delete this.couple.ingredients[index];
    }

    onRemoveCoupleIngredientFail(error) {
        toastr.error(error);
    }

    onGetInitialIngredientOptionsSuccess(ingredients) {
        console.log(ingredients);
        const ingrs = {};
        Object.keys(ingredients).map(key =>
            ingrs[ingredients[key].name] = 1,
        );
        this.ingredientOptions = ingrs;
    }

    onGetInitialIngredientOptionsFail(error) {
        toastr.error(error);
    }
}

export default alt.createStore(CoupleStore);
