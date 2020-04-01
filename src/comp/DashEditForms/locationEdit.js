import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {EditUserLocation} from "../../Actions/UserActions"
const LocationEdit = (props)=>{

    const dispatch = useDispatch()

    const [location, setLocation] = React.useState({
        name:'',
        id:null
    })


    const changeLocation = (e)=>{
        setLocation({...location, name:e.target.value})
        
    }

    const selectLocation = (e)=>{
        const select = document.querySelector('#LocationSelect').value;
        if(select !=0){
            const newloc = props.locations.find((loc)=>{
                let select = document.querySelector('#LocationSelect').value
                return loc.id == select;
            })
            setLocation({...location, name:newloc.name, id: newloc.id})
        }
    }

    const ToggleLocation = (e)=>{
        e.preventDefault();
        const userForm = document.querySelector('.locationForm')
        userForm.classList.toggle('visible');

    }

    const submitLocation = (e)=>{
        e.preventDefault();

        const newLocation ={
            name: location.name
        }

        dispatch(EditUserLocation(location.id, newLocation))
        
    }

    return(
        <>
            <div className ="LocationThird">
                <select id="LocationSelect" onChange={selectLocation}>
                    <option value="0">Select Location</option>
                    {props.locations.map((loc)=>(
                        <option value={loc.id}>{loc.name}</option>
                    ))}
                </select>
                <button onClick={(e)=>ToggleLocation(e)}>Open edit form</button>
            </div>
            <form className="locationForm">
                <div>
                    <input type="text" name="name" value={location.name} onChange={changeLocation} placeholder="name"/>
                </div>
                <button onClick={(e)=>submitLocation(e)}>Tesstbtn</button>
            </form>
        </>
    )
}

export default LocationEdit