import React from 'react';

import './App.css';


import {Switch, Route} from 'react-router-dom';
import Login from "./comp/LoginPage";
import Register from "./comp/RegisterPage";
import Home from "./comp/HomePage";
import Dashboard from './comp/DashboardPage';
import Footer from "./comp/Footerbar"
import MarketFeed from "./comp/MarketFeed"
import Navbar from "./comp/Navbar";
import PrivateRoute from "./comp/PrivateRoutes/PrivateRoute"
import PrivateReg from "./comp/PrivateRoutes/PrivateReg"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/login" render={(props)=> <Login {...props}/>}/>
        <PrivateReg path="/register" component={Register} render={(props)=> <Register {...props}/>}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path ='/marketfeed' component={MarketFeed}/>
        <Route path = "/" component ={Home}/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
