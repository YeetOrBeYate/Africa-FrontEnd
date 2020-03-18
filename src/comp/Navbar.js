import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Login from "./LoginPage";
import Register from "./RegisterPage";
import Home from "./HomePage";
import Dashboard from './DashboardPage';
import addItem from "./AddItem";
import Test from "./Menutest";
import Footer from "./Footerbar";

import {useDispatch, useSelector} from "react-redux";
import {clearMenu} from "../Actions/MenuActions";
import {clearUser} from "../Actions/UserActions";


const Navbar = ()=>{

    const dispatch = useDispatch();
    const Menu = useSelector(state=>state.Menu)
    const User = useSelector(state=>state.User)

    const signOut = (e)=>{
        
        localStorage.clear();
        dispatch(clearMenu())
        dispatch(clearUser())
       
    }


    return(
        <div>
            <div className="NavFlex">
                {
                    User.user? 
                    <>
                        <Link to="/">Home</Link>
                        <Link onClick={(e)=>signOut(e)} to='/login'>SignOut</Link>
                        <Link to='/dashboard'>Dashbaord</Link>
                    </>
                    :
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login!</Link>
                        <Link to="/register">Register!</Link>
                        <Link to="/additem">Additem</Link>
                        <Link to="/test">Testpage</Link>
                    </>
                }
            </div>
            <Switch>
                <Route path="/login" render={(props)=> <Login {...props}/>}/>
                <Route path="/register" render={(props)=> <Register {...props}/>}/>
                <Route path='/dashboard' component={Dashboard}/>
                <Route path = '/additem' component={addItem}/>
                <Route path="/test" component={Test}/>
                <Route path = "/" component ={Home}/>
            </Switch>
            <Footer/>
        </div>
    );
}

export default Navbar;