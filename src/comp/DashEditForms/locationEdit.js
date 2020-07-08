import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {EditUserLocation} from "../../Actions/UserActions"

import "../../CSS/innerModal.css"

const LocationEdit = (props)=>{

    const dispatch = useDispatch()
    const User = useSelector(state=>state.User);

    const [location, setLocation] = React.useState({
        name:props.name,
        id:props.id,
        lengthFailure:false
    })


    const changeLocation = (e)=>{
        setLocation({...location, name:e.target.value})
        
    }

    const submitLocation = (e)=>{
        e.preventDefault();

        if(!location.name.length >0){
            setLocation({...location, lengthFailure:true})
        }else{
            const newLocation ={
                name: location.name
            }
            dispatch(EditUserLocation(location.id, newLocation))
        }
    }

    return(
        <>
            <form onSubmit={submitLocation} className="locationForm">
                <div className="formDiv">
                    <input type="text" name="name" value={location.name} onChange={changeLocation} placeholder="name"/>
                </div>
                {location.lengthFailure? <b>Location name was left blank</b> : <></>}
                <div className="formDiv">
                    <button id="formSubmit" onClick={(e)=>submitLocation(e)}>Edit Location</button>
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
            </form>
        </>
    )
}

export default LocationEdit