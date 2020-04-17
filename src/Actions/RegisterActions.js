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

const duplicate = (message,code)=>{
    return{type:'duplicate', payload:{message,code}}
}

const FailureFix = ()=>{
    return{type:'fixed'}
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

            dispatch(good())
        })
        .catch(err=>{
            if(err.response && err.response.status == "409"){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(duplicate(message,code))
            }else{
                dispatch(bad())                
            }
            dispatch(bad())
        })
    }
}

export const fixRegFailure = ()=>{
    return function(dispatch){

        dispatch(FailureFix())
    }
}