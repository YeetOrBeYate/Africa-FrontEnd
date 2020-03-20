import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RemoveItem} from "../../Actions/UserActions";
import {DeleteItem} from "../../Actions/ItemActions";



const ItemDelete = ()=>{

    const User = useSelector(state=>state.User);
    const Item = useSelector(state=>state.Item);
    const dispatch = useDispatch();


    const [itemDel, setItemDel] = React.useState({
        id: null,
        name:''
        
    })

    // This function was hard to look at once I came back a month or two later
    const changeItemDel = (e)=>{
        const select = document.querySelector('#DeleteItemSelect').value;
 

        if(select !=0){
                //loops through my items array, each object will be refered to as item(param)
            const newItem = Item.items.find((item)=>{

                //Grabbing the id of the item in my drop down list
                const newid = document.querySelector('#DeleteItemSelect').value
                //telling the array.find method to return the item thats id==the id I picked from the drop down list
                return item.id == newid
                
            })
            //setting the id and name of the item I'm about to delete
            setItemDel({...itemDel, id:newItem.id, name:newItem.name})
            
        }
    }

    const deleteItem = (e)=>{
        e.preventDefault()
        console.log('WHAT IM SENDING', itemDel)
        dispatch(DeleteItem(itemDel.id))


    }

    return(
        <form className="itemDeleteForm">
            <div>
                <select id="DeleteItemSelect" onChange={changeItemDel}>
                    <option value='0'>Pick item</option>
                    {
                        Item.items.map((item)=>(
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