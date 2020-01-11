import React from 'react';


const initialState = {
    navForward:false,
    success: false,
    failure:false,
    loading: false
}

export const RegisterReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'loading':
            return {...state, loading:true}
        case 'good':
            return {...state, loading:false, success: true, navForward:true}
        case 'bad':
            return {...state, loading:false, failure: true}
        case 'moved':
            return {...state, navForward:false}
        default:
            return state
    }
}