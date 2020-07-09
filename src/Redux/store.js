import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

import {LoginReducer} from "../Reducers/Login";
import {RegisterReducer} from "../Reducers/Register";
import {CategoryReducer} from "../Reducers/Categorys";
import {UserReducer} from "../Reducers/User";
import {ItemReducer} from "../Reducers/Item";
import {MenuReducer} from "../Reducers/Menu";

const rootReducer = combineReducers({
    Login:LoginReducer,
    Register:RegisterReducer,
    Category:CategoryReducer,
    User: UserReducer,
    Item:ItemReducer,
    Menu:MenuReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk));