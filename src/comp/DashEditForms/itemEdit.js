import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditItems} from "../../Actions/ItemActions";


const ItemEdit = (props)=>{

    const dispatch = useDispatch()

    const [item, setItem] = React.useState({
        id:'',
        name:'',
        description:'',
        price:'',
        user_id:props.userid,
        category_id:'',
        location_id:''
    })

    const changeItem = (e)=>{
        setItem({...item, [e.target.name]: e.target.value})
    }

    const selectItem = (e)=>{
        const select = document.querySelector('#ItemSelect').value

        if(select !=0){
           const newItem = props.items.find((itm)=>{
               let select = document.querySelector('#ItemSelect').value
               return itm.id == select;
           })
           setItem({...item, id:newItem.id, description: newItem.description, name:newItem.name, price:newItem.price, category_id:newItem.category_id, location_id:newItem.location_id})
           document.querySelector('#CategorySelect').value = 0;
        }
    }

    const ToggleItem = (e)=>{
        e.preventDefault();
        const userForm = document.querySelector('.itemForm')
        userForm.classList.toggle('visible');

    }

    const submitItem = (e)=>{
        e.preventDefault()
        
        const newItem ={
            name:item.name,
            description: item.description,
            price: item.price,
            user_id:item.user_id,
            category_id:item.category_id,
            location_id:item.location_id
        }
        //replace with item action to make the put request
        dispatch(EditItems(item.id, newItem))
        
    }


    return(
        <>
            <div className ="Third">
            <select id="ItemSelect" onChange={(e)=>selectItem(e)}>
                <option value="0">Select Item</option>
                {props.items.map((item,index)=>(
                    <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <button onClick={(e)=>ToggleItem(e)}>Open edit form</button>
            </div>
            <form className="itemForm">
                <div>
                    <input type="text" name="name" onChange={changeItem} value={item.name} placeholder="name"/>
                </div>
                <div>
                    <input type="text" name="price" onChange={changeItem} value={item.price} placeholder="price"/>
                </div>
                <div>
                    <textarea type="text" name="description" onChange={changeItem} value={item.description} placeholder="description" cols="31"/>
                </div>
                <div>
                    <select id ='CategorySelect' name="category_id" onChange={changeItem} value = {item.category_id}>
                        <option value = "0">Select Category</option>
                        {props.categories.map((cat)=>(
                                <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <select  name='location_id' onChange={changeItem} value={item.location_id}>
                        <option>Pick a location</option>
                        {props.locations.map((loc)=>(
                            <option value={loc.id}>{loc.name}</option>
                            ))}
                    </select>
                </div>
                <button onClick={(e)=>submitItem(e)}>Edit Item!</button>
            </form>
        </>
    )

}

export default ItemEdit