import React from 'react';

import "../CSS/Navbar.css"

import {signIn, stopMove} from "../Actions/LoginActions";
import {useDispatch, useSelector} from 'react-redux';

const Login = (props)=>{

    const state = useSelector(state=>state.Login);
    const dispatch = useDispatch();

    React.useEffect(()=>{

        if(state.navForward){
            props.history.push('/dashboard')
            dispatch(stopMove())
        }
    
    },[state.navForward])


    const [person, setPerson] = React.useState({
        username: '',
        password: ''
    })

    const submit =  (e,person)=>{
        e.preventDefault();

         dispatch(signIn(person))
        
    }

    const setUsername = (e)=>{
        setPerson({...person, username: e.target.value})
        
    }

    const setPassword = (e)=>{
        setPerson({...person, password: e.target.value})
        
    }

    return(
        <div className="Loginpage">
            <form onSubmit={(e)=>submit(e,person)} data-testid="loginForm" className="loginForm">
                <h1 data-testid="loginTitle" id ="loginTitle">Login</h1>
                <div className="loginItem">
                    <input data-testid="username" type="text" onChange={setUsername} placeholder="username"/>
                </div>
                <div className="loginItem">
                    <input data-testid="password" type="password" onChange={setPassword} placeholder="password"/>
                </div>
                <button data-testid="loginButton" id="loginButton" onClick={(e)=>submit(e,person)}>Login</button>
            {
                state.failure ? <b>Invalid Credentials!</b> : <></>
            }
            </form>
        </div>
    );
}

export default Login;