import {AxiosWithAuth} from "../comp/AddItem";
import React from 'react';

const Loading = ()=>{
    return {type:'Itemloading'}
}

const setItems = (data)=>{
    return {type:'Itemgot', payload:data}
}

const editItem = (id,data)=>{
    return {type: 'Itemedit', payload:data, put:id}
}

const addItem = (data)=>{
    return {type:'Itemadd', payload:data}
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

export const EditItems = (id, item)=>{

    return function(dispatch){

        dispatch(Loading())

        return AxiosWithAuth().put(`/item/${id}`,item)
        .then(res=>{
            console.log('NEW ITEM', item)
            dispatch(editItem(id,item))
        })
    }
}

export const AddItem = (item)=>{

    return function(dispatch){

        dispatch(Loading())
        
        return AxiosWithAuth().post(`/item`, item)
        .then(res=>{
            console.log('NEW add item', res)

            dispatch(addItem(item))
        })
    }
}