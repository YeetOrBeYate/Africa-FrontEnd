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

const UserGood = (data, token)=>{
    return {type:'userGood', payload: data, token:token}
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
            
            const token = res.data.token;
           
            let user = res.data.format
            
            dispatch(good())
            dispatch(UserGood(user,token))
            user = JSON.stringify(user)

            localStorage.setItem('token',token)
            localStorage.setItem('user', user)
        })
        .catch(err=>{
            console.log('bad',err)
            dispatch(bad())
        })

    }
}