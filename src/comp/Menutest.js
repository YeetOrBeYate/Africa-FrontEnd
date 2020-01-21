import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditUser,EditUserItem,CloseEditUserItem,EditUserLocation,CloseEditUserLocation} from "../Actions/UserActions";
import ItemPost from './DashPostForms/itemPost';
import LocationPost from "./DashPostForms/locationPost";
import ItemDelete from "./DashDeleteForms/itemDelete";
import LocationDelete from './DashDeleteForms/locationDelete';

import picture from "../pics/icons8-user-50.png";
import ShopPicture from "../pics/icons8-shop-50.png"

const Test = ()=>{

                        {/* <div className="UserToggle">
                        <h1>Location form</h1>
                        <select id="LocationSelect" onChange={selectLocation}>
                            <option value="0">Select Location</option>
                            {state.user.locations.map((loc)=>(
                                <option value={loc.id}>{loc.name}</option>
                            ))}
                        </select>
                        <button onClick={(e)=>ToggleLocation(e)} id="Locationbtn">Edit Location</button>
                        <button onClick={(e)=>TogglePostLocation(e)}>Add Location</button>
                        <button onClick={(e)=>ToggleDeleteLocation(e)}>Delete Location</button>
                    </div> */}

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const dispatch = useDispatch();

    // .DashboardUtils{
    //     margin:0;
    //     width: 30%;
    //     border: 1px solid black;
      
    //     display: flex;
    //     flex-direction: column;
        
    //   }

    //   .Dashboard-CRUD{
  
    //     margin: 2%;
    //   }

    //   .UserOption{
    //     background: #ac7c83;
    //     border: 2px solid #816367;
    //     border-radius: 15px;
    //   }

    const editProfile =(e)=>{
        e.preventDefault();
        const form = document.querySelector('.userForm')
        form.classList.toggle('visible')
    }

    const openSecondary =(e)=>{
        console.log('ran')
        e.preventDefault();
        const secondary = document.querySelector('.Secondary')
        secondary.classList.toggle('visible')

    }

    const openItemSecondary = (e)=>{
        e.preventDefault()
        const yeet = document.querySelector(".ItemSecondary")
        yeet.classList.toggle('visible')
    }

    const openThird=(e)=>{
        e.preventDefault()
        const yeet = document.querySelector('.Third')
        yeet.classList.toggle('visible')
    }

    const addItem = (e)=>{
        e.preventDefault()
        const yeet = document.querySelector('.AddForm')
        yeet.classList.toggle('visible')
    }

    const deleteItem = (e)=>{
        e.preventDefault()
        const yeet = document.querySelector('.DeleteForm')
        yeet.classList.toggle('visible')
    }

    const editItem=(e)=>{
        e.preventDefault()
        const yeet = document.querySelector('EditForm')
        yeet.classList.toggle('visible')
    }

    return(
        <section className="DashboardUtils">
            <div className="Dashboard-CRUD UserOption">
                <div className="Primary">
                    <div>
                        <img src={picture} alt="buttface"/>
                    </div>
                     
                     <div>
                         <h2 onClick={(e)=>openSecondary(e)}>Profile</h2>
                         <p>Edit your profile here</p>
                     </div>
                </div>
                <div className="Secondary">
                {/* Then if you click this button, the edit form comes up */}
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>editProfile(e)}>Edit profile icon</button>
                        <h3>Edit the profile</h3>
                    </div>
                </div>
                <div className="userForm">
                    <h1>Form</h1>
                </div>
            </div>


            <div className="Dashboard-CRUD ItemOption">
                <div className="Primary">
                    <div>
                        <img src={ShopPicture} alt="buttface"/>
                    </div>
                    
                    <div>
                        <h2 onClick={(e)=>openItemSecondary(e)}>Profile</h2>
                        <p>Edit your profile here</p>
                    </div>
                </div>
                <div className="ItemSecondary">
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>openThird(e)}>Edit an item</button>
                        <h3>Edit Item</h3>
                    </div>
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>addItem(e)}>Add Item</button>
                        <h3>Edit Item</h3>
                    </div>
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>deleteItem(e)}>Delete an Item</button>
                        <h3>Edit Item</h3>
                    </div>
                </div>
                <div className ="Third">
                    <select>
                        <option value='0'>poop</option>
                    </select>
                    <button onClick={(e)=>editItem(e)}>Open edit form</button>
                </div>
                <div className="EditForm">
                    <h1>Edit form</h1>
                </div>
                <div className="AddForm">
                    <h1>Add Form</h1>
                </div>
                <div className="DeleteForm">
                    <h1>Delete form</h1>
                </div>
            </div>
        </section>
    );

}
export default Test;