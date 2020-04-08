import React from 'react';
import {signUp, stopMove} from '../Actions/RegisterActions';

import {useDispatch, useSelector} from 'react-redux';

import "../CSS/Navbar.css"

const Register =(props)=>{

    const dispatch = useDispatch();
    const state = useSelector(state=>state.Register);


    React.useEffect(()=>{
       if(state.navForward){

           props.history.push('/login')
           dispatch(stopMove())
       }
        
    }, [state.success])

    const [person, setPerson]= React.useState({
        username:'',
        password: ''
    })

    const setThePerson = (e)=>{
        setPerson({...person, [e.target.name]: e.target.value})
    }

    const register = (e)=>{
        e.preventDefault();
        dispatch(signUp(person));

    }

    return(
        <div className="Registerpage">
            <form className="loginForm">
                <h1 id = "loginTitle">Register</h1>
                <div className = "loginItem">
                    <input type='text' placeholder = "username" name='username' onChange={setThePerson}/>
                </div>
                <div className = "loginItem">
                    <input type='password' placeholder = "password" name ='password' onChange={setThePerson}/>
                </div>
                <button id = "loginButton" onClick={(e)=>register(e)}>Register</button>
            </form>
        </div>
    );
}

export default Register;
