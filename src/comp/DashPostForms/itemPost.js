import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AddItem} from "../../Actions/ItemActions";


const ItemYeet = ()=>{

    const User = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const dispatch = useDispatch();


    const [postItem,setPostItem] = React.useState({
        name:'',
        description:'',
        price:'',
        user_id: User.user.id,
        category_id:null,
        location_id:null,
        postFail:false
    })

    const changePostItem = (e)=>{
        setPostItem({...postItem, [e.target.name]:e.target.value, postFail:false})
    }

    const sendItem=(e)=>{
        e.preventDefault()

        if(!postItem.name || !Number(postItem.price) ||!postItem.category_id || !postItem.location_id){
            setPostItem({...postItem, postFail:true})
        }else{
            const newPost= {
                name: postItem.name,
                description: postItem.description,
                price:parseFloat(postItem.price).toFixed(2),
                user_id:postItem.user_id,
                category_id:Number(postItem.category_id),
                location_id:Number(postItem.location_id)
            }

            console.log('what ill send', newPost)
            dispatch(AddItem(newPost))
        }
        
    }

    return(
            <form className="itemPostForm">
                <div className="formDiv">
                    <input type="text" name="name" onChange={changePostItem} value={postItem.name} required placeholder="Item Name"/>
                </div>
                <div className="formDiv">
                    <input type='text' name="price" onChange={changePostItem} value={postItem.price} required placeholder="Item Price"/>
                </div>
                <div className="formDiv">
                    <textarea type="text" name="description" onChange={changePostItem} value={postItem.description} placeholder="Item Description" cols="31"/>
                </div>
                <div className="formDiv">
                    <select onChange={changePostItem} required name="category_id">
                        <option>Pick a category</option>
                        {Category.categories.map((cat)=>(
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select> 
                    <select onChange={changePostItem} required name='location_id'>
                        <option value=''>Pick a location</option>
                        {User.user.locations.map((loc)=>(
                            <option value={loc.id}>{loc.name}</option>
                            ))}
                    </select>
                </div>
                {postItem.postFail? <b>Check form</b>: <></>}
                <button id="formSubmit" onClick={(e)=>sendItem(e)}>Add Item</button>
            </form>
    );
}

export default ItemYeet;