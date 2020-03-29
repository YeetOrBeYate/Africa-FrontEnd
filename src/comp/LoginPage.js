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

    const yeet =  (e,person)=>{
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
            <h1>Login</h1>
            <form>
                <div>
                    <input type="text" onChange={setUsername} placeholder="username"/>
                </div>
                <div>
                    <input type="text" onChange={setPassword} placeholder="password"/>
                </div>
                <button onClick={(e)=>yeet(e,person)}>Login</button>
            </form>
            {
                state.failure ? <div>Invalid Credentials!</div> : <></>
            }
        </div>
    );
}

export default Login;