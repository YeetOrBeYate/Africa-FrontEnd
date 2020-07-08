import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditItems} from "../../Actions/ItemActions";


const ItemEdit = (props)=>{

    console.log('did load')

    const dispatch = useDispatch()
    const Item = useSelector(state=>state.Item)

    const [item, setItem] = React.useState({
        id:props.itemId,
        name:props.name,
        description:props.description,
        price:props.price,//required
        user_id:props.userid,
        category_id:props.category_id,
        location_id:props.id,
        numberfail: false
    })

    const changeItem = (e)=>{
        setItem({...item, [e.target.name]: e.target.value, numberfail:false})
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
            dispatch(EditItems(item.id, newItem))
        }
    }


    return(
        <>
            <form onSubmit={submitItem} className="itemForm">
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
                <div className="formDiv">
                    <button id="formSubmit" onClick={(e)=>submitItem(e)}>Edit Item</button>
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
        </>
    )
}

export default ItemEdit