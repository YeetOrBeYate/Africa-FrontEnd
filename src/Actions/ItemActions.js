import {AxiosWithAuth} from "../comp/AddItem";
import React from 'react';
import ItemDelete from "../comp/DashDeleteForms/itemDelete";
import {invalidToken} from "./utilities";

const Loading = ()=>{
    return {type:'Itemloading'}
}

const setItems = (data)=>{
    return {type:'Itemgot', payload:data}
}

const setMarketItems = (data)=>{
    return {type:'MarketItemgot', payload:data}
}

const editItem = (id,data)=>{
    return {type: 'Itemedit', payload:data, put:id}
}

const addItem = (data)=>{
    return {type:'Itemadd', payload:data}
}

const deleteItem = (data)=>{
    return {type:'Itemdelete', payload:data}
}

const failureItem = ()=>{
    return {type:'failureItem'}
}

const ItemFix = ()=>{
    return{type:'ItemFix'}
}

export const LoadItems =(userId)=>{

    return function(dispatch){

        dispatch(Loading())

        return AxiosWithAuth().get(`/item/${userId}`)

        .then(res=>{
            let items = res.data.item
            dispatch(setItems(items))

        })
        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(failureItem())
            }else{
                dispatch(failureItem())
            }
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
        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(failureItem())
            }else{                
                dispatch(failureItem())
            }
        })
    }
}

export const AddItem = (item)=>{

    return function(dispatch){

        dispatch(Loading())
        
        return AxiosWithAuth().post(`/item`, item)
        .then(res=>{
            let itemId = res.data.id

            item = {...item, id:itemId}

            dispatch(addItem(item))
        })
        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(failureItem())
            }else{                
                dispatch(failureItem())
            }
        })
    }
}

export const DeleteItem = (id)=>{

    return function(dispatch){

        dispatch(Loading())

        return AxiosWithAuth().delete(`/item/${id}`)
        .then(res=>{
            console.log(res)
            dispatch(deleteItem(id))
        })
        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(failureItem())
            }else{                
                dispatch(failureItem())
            }
        })
    }
}

export const LoadMarketItems = ()=>{

    return function(dispatch){

        dispatch(Loading())

        return AxiosWithAuth().get(`https://africa-marketplace.herokuapp.com/item`)

        .then(res=>{
            let items = res.data.items
            dispatch(setMarketItems(items))
        })

        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(failureItem())
            }else{
                dispatch(failureItem())
            }
        })
    }
}

export const FixItemFailure = ()=>{

    return function(dispatch){
        dispatch(ItemFix())
    }
}