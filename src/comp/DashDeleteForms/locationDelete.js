import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {RemoveLocation} from "../../Actions/UserActions";

const LocationDelete = (props)=>{

    let closeModal = props.closeModal


    const dispatch = useDispatch();
    const User = useSelector(state=>state.User);

    const [locationDel,setLocationDel] = React.useState({
        id:props.id,
        name:props.name
    })

    const deleteLocation =(e)=>{
        e.preventDefault()
        console.log("what I'll be sending",locationDel)
        dispatch(RemoveLocation(locationDel.id))
    }

    return(
        <form className="locationDeleteForm">
            <div className="formDiv">
                <button id = "formSubmit" onClick={(e)=>deleteLocation(e)}>Yes, delete {locationDel.name}</button>
                <button id = "formSubmit" onClick={(e)=>closeModal(e)}>No, keep {locationDel.name}</button>
            </div>
            {
                User.loading?

                <div class="spinner-square">
                    <div class="square-1 square"></div>
                    <div class="square-2 square"></div>
                    <div class="square-3 square"></div>
                </div>

                :
                <></>
            }
        </form>);

}

export default LocationDelete;