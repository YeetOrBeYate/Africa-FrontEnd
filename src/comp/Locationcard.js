import React from 'react';
import {useSelector} from 'react-redux';
import ItemCard from './Itemcard';
import LocationModal from 'react-modal'
import EditPicture from "../pics/icons8-edit-48.png";
import DeletePicture from "../pics/icons8-delete-bin-50.png";

import LocationEdit from './DashEditForms/locationEdit'
import LocationDelete from './DashDeleteForms/locationDelete';

const Locationcard = (props)=>{

    const state = useSelector(state=>state.User);
    const Item = useSelector(state=>state.Item);


    const [itemCount, setItemCount] = React.useState(props.Count)
    const [open, setOpen] = React.useState(false)
    const [locationEdit, setLocationEdit] = React.useState(false)
    const [locationDelete,setLocationDelete] = React.useState(false)


    const Gimme = (Lid)=>{
        const size = Item.items.filter((item)=>{
            if(item.location_id == props.id){
                return item
            }
        })
        try{
            let locationCard = document.querySelector(`.location-${Lid}`)
            
            if(size.length>itemCount){
                 //conduct the addition animation, and change the item count to the new current list size
                locationCard.style.animation = "addition .75s 1";
                //this is to clear/reset the animation
                locationCard.addEventListener('animationend', ()=>{
                    locationCard.style.animation = "none"
                })
                setItemCount(size.length)
            }else if(size.length<itemCount){
                //conduct the subtract animation, and change the item count to the new current list size
                locationCard.style.animation = "subtract .75s 1";
                setItemCount(size.length)
                //this is to clear/reset the animation
                locationCard.addEventListener('animationend', ()=>{
                    locationCard.style.animation = "none"
                })
            }

            
        }catch(err){

            alert("location",err)
            
        }

        return size.length
    }

    const toggleItems = (e,number)=>{
        e.preventDefault()

        //grabbing the objects I need to perform DOM operations on
        const button = document.querySelector(`.location-${number} .location-button`)
        const arrow = document.querySelector(`.location-${number} .down`)
        const childclass = document.querySelectorAll(`.locationItem-${number}`)
        //this one needs to happen the same evertime no matter what
        childclass.forEach((child)=>{
            child.classList.toggle('locationVisible')
        })
        //if our card is closed
        if(!open){
            button.style.animation = ".4s linear 0s 1 normal forwards running toggleButtonOpen"
            arrow.classList.toggle('rotateRight')
            setOpen(true)
        }else{
        //if out card is open
        button.style.animation = ".4s linear 0s 1 normal forwards running toggleButtonClose"
        arrow.classList.toggle('rotateRight')
        setOpen(false)
        }

    }

    const closeModalButton = (e)=>{
        e.preventDefault()

        setLocationDelete(false)
    }


    return(
    <div className={`location location-${props.id}`}>
        <LocationModal
            id = "Location"
            isOpen = {locationEdit}
            className = "DashboardModal"
            onRequestClose={()=>setLocationEdit(false)}
        >
            <LocationEdit name={props.name} id= {props.id}/>

        </LocationModal>
        <LocationModal
            id = "Location"
            isOpen = {locationDelete}
            className = "DashboardModal"
            onRequestClose={()=>setLocationDelete(false)}
        >
            <LocationDelete closeModal = {closeModalButton} name={props.name} id= {props.id}/>

        </LocationModal>
        <section className='location-labels'>
            <h3 id='locationName'>{props.name}</h3>
            <div className = "locationCrud">
                <img onClick={()=>setLocationEdit(true)} src={EditPicture} alt="edit Location"/>
                <img onClick={()=>setLocationDelete(true)} src={DeletePicture} alt="delete Location"/>
                <div className="location-button" onClick={(e)=>toggleItems(e,props.id)}>
                    <p>View items</p>
                    <p>({Gimme(props.id)})</p>
                    <div className="down"></div>
                </div>
            </div>
        </section>
        {Item.items.map((item,index)=>{
            if(item.location_id == props.id){
            return(
            <ItemCard
                key = {index}
                userid={state.userid}
                itemId = {item.id}
                id = {item.location_id} 
                name = {item.name} 
                description = {item.description} 
                price = {item.price} 
                category_id = {item.category_id}
                locations = {state.user.locations}
            />)
            }
        })}
    </div>)
}

export default Locationcard