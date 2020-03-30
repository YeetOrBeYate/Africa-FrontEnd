import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Login from "./comp/LoginPage";
import Register from "./comp/RegisterPage";
import Home from "./comp/HomePage";
import Dashboard from './comp/DashboardPage';
import addItem from "./comp/AddItem";
import Test from "./comp/Menutest";

import Navbar from "./comp/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/login" render={(props)=> <Login {...props}/>}/>
        <Route path="/register" render={(props)=> <Register {...props}/>}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path = '/additem' component={addItem}/>
        <Route path="/test" component={Test}/>
        <Route path = "/" component ={Home}/>
      </Switch>
    </div>
  );
}

export default App;
