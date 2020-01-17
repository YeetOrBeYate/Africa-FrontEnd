import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditUser,EditUserItem,CloseEditUserItem,EditUserLocation,CloseEditUserLocation} from "../Actions/UserActions";
import ItemPost from './DashPostForms/itemPost';
import LocationPost from "./DashPostForms/locationPost";
import ItemDelete from "./DashDeleteForms/itemDelete";
import LocationDelete from './DashDeleteForms/locationDelete';

import picture from "../pics/icons8-user-50.png";

const Test = ()=>{

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
        </section>
    );

}
export default Test;