import React from 'react';
import {signUp, stopMove} from '../Actions/RegisterActions';

import {useDispatch, useSelector} from 'react-redux';

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
            <h1>Register</h1>
            <form>
                <div>
                    <input type='text' placeholder = "username" name='username' onChange={setThePerson}/>
                </div>
                <div>
                    <input type='text' placeholder = "password" name ='password' onChange={setThePerson}/>
                </div>
                <button onClick={(e)=>register(e)}>Register</button>
            </form>
            {
                state.loading ? <div>Loading....</div> : <></>
            }
            {
                state.failure ? <div>Failure:incorrect input</div> : <></>
            }
        </div>
    );
}

export default Register;
