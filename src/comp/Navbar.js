import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Login from "./LoginPage";
import Register from "./RegisterPage";
import Home from "./HomePage";
import Dashboard from './DashboardPage';
import addItem from "./AddItem";


const Navbar = ()=>{

    const signOut = (e)=>{
        
        localStorage.clear();
       
    }

    return(
        <div>
            <div className="NavFlex">
                <Link to="/">Home</Link>
                <Link to="/login">Login!</Link>
                <Link to="/register">Register!</Link>
                <Link to="/additem">Additem</Link>
                <Link onClick={(e)=>signOut(e)} to='/login'>SignOut</Link>
            </div>
            <Switch>
                <Route path="/login" render={(props)=> <Login {...props}/>}/>
                <Route path="/register" render={(props)=> <Register {...props}/>}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path = '/additem' component={addItem}/>
                <Route path = "/" component ={Home}/>
            </Switch>
        </div>
    );
}

export default Navbar;