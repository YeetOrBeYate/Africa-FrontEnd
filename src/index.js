import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

import {LoginReducer} from "./Reducers/Login";
import {RegisterReducer} from "./Reducers/Register";
import {CategoryReducer} from "./Reducers/Categorys";
import {UserReducer} from "./Reducers/User";
import {ItemReducer} from "./Reducers/Item";

const rootReducer = combineReducers({
    Login:LoginReducer,
    Register:RegisterReducer,
    Category:CategoryReducer,
    User: UserReducer,
    Item:ItemReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
<Router>
    <Provider store={store}>
        <App />
    </Provider>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
