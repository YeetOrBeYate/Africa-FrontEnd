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
       

        return AxiosWithAuth().get('/category')
        .then(res=>{
            
            const cats = res.data.categories
            dispatch(good(cats))
        })
        .catch(err=>{
            console.log(err)
            dispatch(bad())
        })
    } 
}