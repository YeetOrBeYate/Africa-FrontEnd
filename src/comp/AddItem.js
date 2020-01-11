import React from 'react';
import {useState} from 'react';
import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';
import {getCats} from "../Actions/CategoryActions";

export const AxiosWithAuth =()=>{
    return axios.create({
        headers:{
            authorization: localStorage.getItem('token')
        }
    })
}

const Additem = ()=>{

    
    
    
    const dispatch = useDispatch();
    const Userstate = useSelector(state=>state.User)
    const Catstate = useSelector(state =>state.Category)
    
    
    const [item, setItem]=useState({
        name:Userstate.id,
        description:'',
        price: '',
        user_id: '',
        category_id: ''
    })
    
    React.useEffect(()=>{
        
        dispatch(getCats())
        
    },[])
    
    if(Catstate.categories === null){
        return(<h1>Loading....</h1>);
    }

    const changeItem=(e)=>{
        setItem({...item, [e.target.name]:e.value})
        console.log(item)
    }

    const submitItem = (e)=>{
        e.preventDefault()

        const cat = document.body.querySelector('#select')

        
    }

    return(<div>
        Additempage
        {console.log(Catstate)}
        <form>
            <div>
                <input type="text" name="name" onChange={changeItem} placeholder="name"/>
            </div>
            <div>
                <input type="text" name="description" onChange={changeItem}placeholder="description"/>
            </div>
            <div>
                <input type="text" name='price' onChange={changeItem} placeholder="price"/>
            </div>
            <div>
                <select id ='select'>
                    <option value="0">Select Category</option>
                    {Catstate.categories.map((cat,index)=>(
                        <option value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={(e)=>submitItem(e)}>submit</button>
        </form>
    </div>);
}

export default Additem;