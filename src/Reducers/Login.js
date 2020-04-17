import React from 'react';


const initialState = {
    navForward:false,
    attemped:false,
    failure:false,
    loading:false,
    message:null,
    code:null
}

export const LoginReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'Loginloading':
            return {...state, loading:true}
        case 'good':
            return{...state, failure:false, attemped:true, loading:false, navForward:true}
        case 'bad':
            return{...state, failure:true, loading:false, failure:true}
        case 'moved':
            return{...state, navForward:false}
        case 'invalidToken':
            return{...state, failure:true, message:action.payload.message, code:action.payload.code}
        case 'resetLogin':
            return {...state, navForward:false, attemped:false, failure:false, loading:false, message:null, code:null}
        default:
            return state
    }
}