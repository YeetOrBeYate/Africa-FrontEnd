import axios from 'axios';

import {AxiosWithAuth} from "../comp/AddItem";


const loading = ()=>{
    return{type:'Catloading'}
}

const good = (data)=>{
    return{type: 'Catgood', payload: data}
}

const bad = ()=>{
    return{type: 'Catbad'}
}

export const getCats = ()=>{

    return function(dispatch){

        dispatch(loading())
        console.log("ran")

        return AxiosWithAuth().get('https://africa-marketplace.herokuapp.com/category')
        .then(res=>{
            console.log(res.data.categories)
            const cats = res.data.categories
            dispatch(good(cats))
        })
        .catch(err=>{
            console.log(err)
            dispatch(bad())
        })
    } 
}