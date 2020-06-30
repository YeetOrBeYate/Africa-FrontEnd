import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AddLocation} from "../../Actions/UserActions";

import "../../CSS/innerModal.css"



const LocationYeet =()=>{

    const dispatch = useDispatch();
    const User = useSelector(state=>state.User);

    
    const [locationPost, setLocationPost] = React.useState({
        name:'',
        user_id:User.user.id,
        locationFailure:false
    })

    const changeLocation = (e)=>{
        setLocationPost({...locationPost, [e.target.name]:e.target.value})
    }

    const sendLocation = (e)=>{
        e.preventDefault();

        if(!locationPost.name){
            setLocationPost({...locationPost, locationFailure:true})
        }else{
            const newLocation = {
                name :locationPost.name,
                user_id:locationPost.user_id
            }
            dispatch(AddLocation(newLocation))
        }

    }

    return(
        <form className="locationPostForm">
            <div className="formDiv">
                <input type="text" name="name" onChange={changeLocation} value={locationPost.name} required placeholder="Location Name"/>
            </div>
            {locationPost.locationFailure? <b>Location name was left blank</b>: <></>}
            <div className="formDiv">
                <button id ="formSubmit" onClick={(e)=>sendLocation(e)}>Add Location</button>
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
    );

}

export default LocationYeet;