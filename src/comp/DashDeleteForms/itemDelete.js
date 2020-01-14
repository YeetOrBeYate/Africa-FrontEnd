import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RemoveItem} from "../../Actions/UserActions";

const ItemDelete = ()=>{

    const User = useSelector(state=>state.User);
    const dispatch = useDispatch();


    const [itemDel, setItemDel] = React.useState({
        id: null,
        name:''
        
    })

    const changeItemDel = (e)=>{
        const select = document.querySelector('#DeleteItemSelect').value;
        console.log("state",User)
        console.log("id", select)

        if(select !=0){
            
            const newItem = User.user.items.find((item)=>{

                const newid = document.querySelector('#DeleteItemSelect').value

                return item.id == newid
                
            })
            setItemDel({...itemDel, id:newItem.id, name:newItem.name})
            
        }
    }

    const deleteItem = (e)=>{
        e.preventDefault()
        console.log(itemDel.id)
        dispatch(RemoveItem(itemDel.id))
        console.log(User.user)

    }

    return(
        <form className="itemDeleteForm">
            <div>
                <select id="DeleteItemSelect" onChange={changeItemDel}>
                    <option value='0'>Pick item</option>
                    {
                        User.user.items.map((item)=>(
                            <option value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <button onClick={(e)=>deleteItem(e)}>Delete item</button>
            </div>
        </form>
    );

}

export default ItemDelete;