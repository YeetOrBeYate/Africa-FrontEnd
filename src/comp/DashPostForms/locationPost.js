import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AddLocation} from "../../Actions/UserActions";


const LocationYeet =()=>{

    const dispatch = useDispatch();
    const User = useSelector(state=>state.User);

    
    const [locationPost, setLocationPost] = React.useState({
        name:'',
        user_id:User.user.id
    })

    const changeLocation = (e)=>{
        setLocationPost({...locationPost, [e.target.name]:e.target.value})
    }

    const sendLocation = (e)=>{
        e.preventDefault();
        console.log(locationPost)

        const newLocation = locationPost;

        dispatch(AddLocation(newLocation))
    }

    

    return(
        <form className="locationPostForm">
            <div>
                <input type="text" name="name" onChange={changeLocation} value={locationPost.name} placeholder="PostLName"/>
            </div>
            <button onClick={(e)=>sendLocation(e)}>postItem</button>
        </form>
    );

}

export default LocationYeet;