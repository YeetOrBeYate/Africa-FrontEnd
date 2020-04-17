import axios from 'axios';
import {invalidToken, AxiosWithAuth} from "./utilities";



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
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(bad())
            }else{
                dispatch(bad())
            }
        })
    } 
}