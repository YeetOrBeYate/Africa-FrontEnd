import React from 'react';
import axios from 'axios';

const loading = ()=>{
    return {type: 'Loginloading'}
}

const good = ()=>{
    return {type: 'good' }
}

const bad = ()=>{
    return { type: 'bad'}
}

const forward = ()=>{
    return {type:'moved'}
}

const fixFailure = ()=>{
    return {type:'resetLogin'}
}

//this fucntion sets the user id in the user reducer, dont remove the case for the user reducer that corrisponds
const UserId = (data)=>{
    return {type:'userId', payload:data}
}


export const stopMove = ()=>{

    return function(dispatch){

        dispatch(forward())
    }
}

export const signIn = (person)=>{

    return function(dispatch){

        dispatch(loading());
        //removed the userloading action from this location
        return axios.post('https://africa-marketplace.herokuapp.com/auth/login', person)
        .then(res=>{

            const token = res.data.token;
            let userid = res.data.id;

            
            userid = JSON.stringify(userid)

            localStorage.setItem('token',token)
            localStorage.setItem('userId', userid)

            dispatch(good())
            dispatch(UserId(userid))
        })
        .catch(err=>{
            console.log('bad',err)
            dispatch(bad())
        })

    }
}

export const FixFailure = ()=>{
    return function(dispatch){

        dispatch(fixFailure())
    }
}