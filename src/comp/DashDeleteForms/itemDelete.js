import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DeleteItem} from "../../Actions/ItemActions";



const ItemDelete = (props)=>{


    const dispatch = useDispatch();
    const Item = useSelector(state=>state.Item)
    const closeModal = props.closeModal


    const [itemDel, setItemDel] = React.useState({
        id: props.itemId,
        name:props.name
    })


    const deleteItem = (e)=>{
        e.preventDefault()
        console.log('WHAT IM SENDING', itemDel)
        dispatch(DeleteItem(itemDel.id))


    }

    return(
        <form className="itemDeleteForm">
            <div className="formDiv">
                <button id="formSubmit" onClick={(e)=>deleteItem(e)}>Yes, delete {itemDel.name}</button>
                <button id="formSubmit" onClick={(e)=>closeModal(e)}> No, keep {itemDel.name}</button>
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

export default ItemDelete;