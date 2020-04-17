import React from 'react';
import Loading from 'react-modal';
import Error from "react-modal";
import {Switch, Route, Link} from 'react-router-dom';
import africa from "../pics/africa.png"

import {useDispatch, useSelector} from "react-redux";
import {clearMenu} from "../Actions/MenuActions";
import {clearUser,FixUserFailure} from "../Actions/UserActions";
import {FixItemFailure} from "../Actions/ItemActions"
import {fixRegFailure} from "../Actions/RegisterActions"
import {FixFailure} from '../Actions/LoginActions'

import "../CSS/Navbar.css"


const Navbar = ()=>{

    const dispatch = useDispatch();
    const Menu = useSelector(state=>state.Menu)
    const User = useSelector(state=>state.User)
    const Item = useSelector(state=>state.Item)
    const LoginR = useSelector(state=>state.Login)
    const Register = useSelector(state=>state.Register)

    const [loading,setLoading] = React.useState(false)
    const [error,setError] = React.useState(false)
    const [status, setStatus] = React.useState({message:null, code:null})
    
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

        if(User.loading || LoginR.loading || Item.loading || Register.loading){
            setLoading(true)
        }else{
            setLoading(false)
        }

        if(User.failure || Item.failure){
            setStatus({...status, message:User.message, code:User.code})
            setError(true)
        }

        if(LoginR.message){
            setStatus({...status, message:LoginR.message, code:LoginR.code})
            setError(true)
        }

        if(Register.message){
            setStatus({...status, message:Register.message, code:Register.code })
            setError(true)
        }

    },[User.loading, LoginR.loading, Item.loading, User.failure, Item.failure, Register.loading, Register.failure, LoginR.failure] )


    const signOut = (e)=>{
        localStorage.clear();
        dispatch(clearMenu())
        dispatch(clearUser())
    }

    const closeError = ()=>{
        setError(false)
        setStatus({...status, message:null, code:null})
        dispatch(FixUserFailure())
        dispatch(FixItemFailure())
        dispatch(fixRegFailure())
        dispatch(FixFailure())

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
             className = 'errorModal'
             >
                <h2>An error occured</h2>

                {
                status.code?
                    <>
                        <p>code: {status.code}</p>
                        <p>{status.message}. Please sign out and sign back in to see your content</p>
                    </>
                    :
                    <>
                        <p>we were unable to make the request, please try again</p>
                    </>
                }
             </Error>

            <div className="NavFlex">
                {
                    token? 
                    <>
                        <Link to="/">
                            <img src={africa} alt="africa"/>
                        </Link>
                        <div className="NavSub">
                            <Link onClick={(e)=>signOut(e)} to='/login'>Sign Out</Link>
                            <Link to='/dashboard'>Dashboard</Link>
                            <Link to='/marketfeed'>Market Feed</Link>
                        </div>
                    </>
                    :
                    <>
                        <Link to="/">
                            <img src={africa} alt="africa"/>
                        </Link>
                        <div className="NavSub">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Navbar;