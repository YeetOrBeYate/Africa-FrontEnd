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
        location_id:null
    })

    const changePostItem = (e)=>{
        setPostItem({...postItem, [e.target.name]:e.target.value})
    }

    const sendItem=(e)=>{
        e.preventDefault()
        
        const newPost= {
            name: postItem.name,
            description: postItem.description,
            price:Number(postItem.price),
            user_id:postItem.user_id,
            category_id:Number(postItem.category_id),
            location_id:Number(postItem.location_id)
        }

        
        
        console.log("what i'll send",newPost)


        dispatch(AddItem(newPost))
        // replace with a item action so I can get this out of here
    }

    return(
            <form className="itemPostForm">
                <div className="formDiv">
                    <input type="text" name="name" onChange={changePostItem} value={postItem.name} placeholder="Item Name"/>
                </div>
                <div className="formDiv">
                    <input type='text' name="price" onChange={changePostItem} value={postItem.price} placeholder="Item Price"/>
                </div>
                <div className="formDiv">
                    <textarea type="text" name="description" onChange={changePostItem} value={postItem.description} placeholder="Item Description" cols="31"/>
                </div>
                <div className="formDiv">
                    <select onChange={changePostItem} name="category_id">
                        <option>Pick a category</option>
                        {Category.categories.map((cat)=>(
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select> 
                    <select onChange={changePostItem} name='location_id'>
                        <option>Pick a location</option>
                        {User.user.locations.map((loc)=>(
                            <option value={loc.id}>{loc.name}</option>
                            ))}
                    </select>
                </div>
                <button id="formSubmit" onClick={(e)=>sendItem(e)}>Add Item</button>
            </form>
    );
}

export default ItemYeet;