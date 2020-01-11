import React from 'react';


const initialState = {
    navForward:false,
    attemped: false,
    failure:false,
    loading:false
}

export const LoginReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'loading':
            return {...state, loading:true}
        case 'good':
            return{...state, attemped:true, loading:false, navForward:true}
        case 'bad':
            return{...state, failure:true, loading:false, failure:true}
        case 'moved':
            return{...state, navForward:false}
        default:
            return state
    }
}