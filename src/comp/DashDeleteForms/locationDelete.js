import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {RemoveLocation} from "../../Actions/UserActions";

const LocationDelete = ()=>{

    const User = useSelector(state=>state.User);
    const dispatch = useDispatch();

    const [locationDel,setLocationDel] = React.useState({
        id:null,
        name:''
    })

    const changeLocationDel = ()=>{
        const select = document.querySelector('#DeleteLocationSelect').value;

        if(select!=0){
            const newLoc = User.user.locations.find((loc)=>{

                const select = document.querySelector('#DeleteLocationSelect').value;
                return loc.id == select

            })

            setLocationDel({...locationDel, id:newLoc.id, name:newLoc.name})
        }
    }

    const deleteLocation =(e)=>{
        e.preventDefault()

        console.log("what I'll be sending",locationDel)

        dispatch(RemoveLocation(locationDel.id))
    }

    return(
        <form className="locationDeleteForm">
            <div>
                <select id ='DeleteLocationSelect' onChange={changeLocationDel}>
                    <option value ='0'>Select Location</option>
                    {User.user.locations.map((loc)=>(
                        <option value={loc.id}>{loc.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={(e)=>deleteLocation(e)}>Delete Location</button>
            </div>
        </form>);

}

export default LocationDelete;