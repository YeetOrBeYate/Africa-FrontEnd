import React from 'react'
import {useDispatch} from 'react-redux';
import {RemoveLocation} from "../../Actions/UserActions";

const LocationDelete = (props)=>{


    const dispatch = useDispatch();

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
                <button id = "formSubmit">No, keep {locationDel.name}</button>
            </div>
        </form>);

}

export default LocationDelete;