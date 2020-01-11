import React from 'react';
import axios from 'axios';

const loading = ()=>{
    return {type:'loading'}
}

const good = ()=>{
    return {type: 'good'}

}

const bad = ()=>{
    return {type: 'bad'}
}

const moved = ()=>{
    return{type:'moved'}
}

export const stopMove = ()=>{

    return function(dispatch){

        dispatch(moved())
    }
}

export const signUp = (person)=>{

    return function(dispatch){

        dispatch(loading())

        return axios.post('https://africa-marketplace.herokuapp.com/auth/register', person)
        .then(res=>{
            console.log("good",res)
            dispatch(good())
        })
        .catch(err=>{
            console.log("bad",err)
            dispatch(bad())
        })
    }
}