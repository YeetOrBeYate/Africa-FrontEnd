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
        location_id:1
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
            location_id:postItem.location_id
        }

        
        
        console.log("what i'll send",newPost)


        dispatch(AddItem(newPost))
        // replace with a item action so I can get this out of here
    }

    return(
            <form className="itemPostForm">
                <div>
                    <input type="text" name="name" onChange={changePostItem} value={postItem.name} placeholder="Postname"/>
                </div>
                <div>
                    <input type='text' name="price" onChange={changePostItem} value={postItem.price} placeholder="Postprice"/>
                </div>
                <div>
                    <textarea type="text" name="description" onChange={changePostItem} value={postItem.description} placeholder="Postdescription" cols="31"/>
                </div>
                <select onChange={changePostItem} name="category_id">
                    <option>please pick a category</option>
                    {Category.categories.map((cat)=>(
                        <option value={cat.id}>{cat.name}</option>
                    ))}
                </select> 
                <button onClick={(e)=>sendItem(e)}>postItem</button>
            </form>
    );
}

export default ItemYeet;