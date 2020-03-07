import React from 'react';
import axios from 'axios';

const loading = ()=>{
    return {type: 'loading'}
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


const UserId = (data)=>{
    return {type:'userId', payload:data}
}

const UserLoading = ()=>{
    return {type: 'Userloading'}
}

export const stopMove = ()=>{

    return function(dispatch){

        dispatch(forward())
    }
}

export const signIn = (person)=>{

    return function(dispatch){

        dispatch(loading());
        dispatch(UserLoading());

        return axios.post('https://africa-marketplace.herokuapp.com/auth/login', person)
        .then(res=>{
            console.log(res.data)
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