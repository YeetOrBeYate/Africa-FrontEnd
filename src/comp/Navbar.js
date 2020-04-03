import React from 'react';
import Loading from 'react-modal';
import Error from "react-modal";
import {Switch, Route, Link} from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";
import {clearMenu} from "../Actions/MenuActions";
import {clearUser,FixUserFailure} from "../Actions/UserActions";
import {FixItemFailure} from "../Actions/ItemActions"

import "../CSS/Navbar.css"


const Navbar = ()=>{

    const dispatch = useDispatch();
    const Menu = useSelector(state=>state.Menu)
    const User = useSelector(state=>state.User)
    const Item = useSelector(state=>state.Item)
    const LoginR = useSelector(state=>state.Login)

    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(false)
    
    const token = localStorage.getItem('token')

    const errorStyles = {
        content:{
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width: '30%',
            height: '30%',
            background: '#eef2c3'
        },

    }
    const customStyles = {
        content:{
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            border:'none',
            width: "170px",
            height: "170px"
        },

        overlay:{
            opacity: '1.0',
            backgroundColor: 'transparent'
        }

    }

    React.useEffect(()=>{

        if(User.loading || LoginR.loading || Item.loading){
            setLoading(true)
        }else{
            setLoading(false)
        }

        if(User.failure || Item.failure){
            setError(true)
        }

    },[User.loading, LoginR.loading, Item.loading, User.failure, Item.failure] )


    const signOut = (e)=>{
        localStorage.clear();
        dispatch(clearMenu())
        dispatch(clearUser())
    }

    const closeError = ()=>{
        setError(false)
        dispatch(FixUserFailure())
        dispatch(FixItemFailure())
    }


    return(
        <div className = 'test'>
            <Loading 
            // className='loader'
            isOpen={loading}
            onRequestClose={()=>setLoading(false)}
            style={customStyles}
             >
                 <div className= 'loader'></div>
             </Loading>
             <Error
             isOpen = {error}
             onRequestClose = {closeError}
             style = {errorStyles}
             >
                <h2>An error occured</h2>
                <p>we were unable to make the request, please try again</p>
             </Error>

            <div className="NavFlex">
                {
                    token? 
                    <>
                        <Link to="/">Home</Link>
                        <Link onClick={(e)=>signOut(e)} to='/login'>SignOut</Link>
                        <Link to='/dashboard'>Dashbaord</Link>
                        <Link to='/marketfeed'>MarketFeed</Link>
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
        </div>
    );
}

export default Navbar;