import React from 'react';
import ItemModal from "react-modal"
import {useSelector} from 'react-redux'
import "../CSS/DashboardPage.css";
import ItemEdit from "./DashEditForms/itemEdit"
import ItemDelete from "./DashDeleteForms/itemDelete"

import EditPicture from "../pics/icons8-edit-column-30.png";
import DeletePicture from "../pics/icons8-delete-30.png";

const ItemCard = (props)=>{


    const Category = useSelector(state=>state.Category);
    const [itemEditOpen, setItemEditOpen] = React.useState(false)
    const [itemDeleteOpen, setItemDeleteOpen] = React.useState(false)

    const FindCatName = (catId)=>{
        //need to make sure that the argument is a number
        catId = Number(catId)
        let name = Category.categories.find((cat)=>{
            if(cat.id === catId){
                return cat.name
            }
        })

        return name.name
    }

    const selfToggle = (locationId)=>{
        try{
            const classMates = document.querySelectorAll(`.locationItem-${locationId}.locationVisible`)
            if( classMates && classMates.length>0){
                return `${locationId} locationVisible`
            }else{
                return `${locationId}`
            }
        }
        catch(err){
            alert("item",err)
        }
    }

    const closeDeleteModal = (e)=>{
        e.preventDefault()

        setItemDeleteOpen(false)
    }

    if(!Category.categories){
        return(<div>
            getting some additional information
        </div>)
    }

    return(
        <div className = {`locationItem locationItem-${selfToggle(props.id)}`}>
            <ItemModal
                id="Item"
                isOpen={itemEditOpen}
                onRequestClose = {()=>setItemEditOpen(false)}
                className = "DashboardModal"
            >
                <ItemEdit
                    itemId = {props.itemId}
                    name = {props.name}
                    description = {props.description}
                    price = {props.price}
                    userid = {props.userid}
                    category_id = {props.category_id}
                    id = {props.id}
                    categories = {Category.categories}
                    locations = {props.locations}
                />
            </ItemModal>
            <ItemModal
                id="Item"
                isOpen={itemDeleteOpen}
                onRequestClose = {()=>setItemDeleteOpen(false)}
                className = "DashboardModal"
            >
                <ItemDelete
                    closeModal = {closeDeleteModal}
                    itemId = {props.itemId}
                    name = {props.name}
                />
            </ItemModal>
            <div className = "itemCrud">
                <img onClick={()=>setItemEditOpen(true)} src={EditPicture} alt="edit item"/>
                <img onClick={()=>setItemDeleteOpen(true)} src={DeletePicture} alt = "delete item"/>
            </div>
            <h2>{props.name} ({FindCatName(props.category_id)})</h2>
            <h3>{props.description}</h3>
            <h3>{props.price}</h3>
        </div>
    )

}

export default ItemCard