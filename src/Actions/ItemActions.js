import {AxiosWithAuth} from "../comp/AddItem";
import React from 'react';

const Loading = ()=>{
    return {type:'Itemloading'}
}

const setItems = (data)=>{
    return {type:'Itemgot', payload:data}
}

export const LoadItems =(userId)=>{

    return function(dispatch){
        dispatch(Loading())

        return AxiosWithAuth().get(`/item/${userId}`)

        .then(res=>{
            let items = res.data.item
            
            dispatch(setItems(items))

        })
    }
}