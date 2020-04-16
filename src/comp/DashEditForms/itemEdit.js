import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditItems} from "../../Actions/ItemActions";


const ItemEdit = (props)=>{

    const dispatch = useDispatch()

    const [item, setItem] = React.useState({
        id:'',
        name:'',//required
        description:'',
        price:'',//required
        user_id:props.userid,
        category_id:'',
        location_id:'',
        numberfail: false
    })

    const changeItem = (e)=>{
        setItem({...item, [e.target.name]: e.target.value, numberfail:false})
    }

    const selectItem = (e)=>{
        const select = document.querySelector('#ItemSelect').value

        if(select !=0){
           const newItem = props.items.find((itm)=>{
               let select = Number(document.querySelector('#ItemSelect').value)
               return itm.id === select;
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

        if(!Number(item.price) || !item.name || !item.category_id || !item.location_id){
            setItem({...item, name:'', price:"", location_id:"", category_id:"", numberfail:true})
        }else{
            const newItem ={
                name:item.name,
                description: item.description,
                price:Number(item.price).toFixed(2),
                user_id:item.user_id,
                category_id:Number(item.category_id),
                location_id:Number(item.location_id)
            }  

            console.log('what Ill edit', newItem)
            dispatch(EditItems(item.id, newItem))
        }
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
                <div className='formDiv'>
                    <input type="text" name="name" onChange={changeItem} value={item.name} required placeholder="name"/>
                </div>
                <div className='formDiv'>
                    <input type="text" name="price" onChange={changeItem} value={item.price} required placeholder="price"/>
                </div>
                <div className='formDiv'>
                    <textarea type="text" name="description" onChange={changeItem} value={item.description} placeholder="description" cols="32"/>
                </div>
                <div className='formDiv'>
                    <select id ='CategorySelect' name="category_id" onChange={changeItem} value = {item.category_id} required>
                        <option value="">Category</option>
                        {props.categories.map((cat)=>(
                                <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <select  name='location_id' onChange={changeItem} value={item.location_id} required>
                        <option value="">Location</option>
                        {props.locations.map((loc)=>(
                            <option value={loc.id}>{loc.name}</option>
                            ))}
                    </select>
                </div>
                {item.numberfail? <b>Double-Check the name,price,category and location fields</b>: <></>}
                <button id="formSubmit" onClick={(e)=>submitItem(e)}>Edit Item</button>
            </form>
        </>
    )

}

export default ItemEdit