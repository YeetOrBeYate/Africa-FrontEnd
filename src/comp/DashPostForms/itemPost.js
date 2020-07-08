import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {AddItem} from "../../Actions/ItemActions";

import "../../CSS/innerModal.css"



const ItemYeet = ()=>{

    const User = useSelector(state=>state.User);
    const Item = useSelector(state=>state.Item);
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

            dispatch(AddItem(newPost))
        }
        
    }

    return(
            <form onSubmit={sendItem} className="itemPostForm">
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
                        <option>Category</option>
                        {Category.categories.map((cat, index)=>(
                            <option key={index} value={cat.id}>{cat.name}</option>
                        ))}
                    </select> 
                    <select onChange={changePostItem} required name='location_id'>
                        <option value=''>Location</option>
                        {User.user.locations.map((loc,index)=>(
                            <option key={index} value={loc.id}>{loc.name}</option>
                            ))}
                    </select>
                </div>
                {postItem.postFail? <b>Check form</b>: <></>}
                <div className="formDiv">
                    <button id="formSubmit" onClick={(e)=>sendItem(e)}>Add Item</button>
                </div>
                {
                    Item.loading?

                    <div class="spinner-square">
                        <div class="square-1 square"></div>
                        <div class="square-2 square"></div>
                        <div class="square-3 square"></div>
                    </div>

                    :
                    <></>
                }
            </form>
    );
}

export default ItemYeet;