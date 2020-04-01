import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditUser,EditUserLocation} from "../Actions/UserActions";
import {openItems, closeItems, openLocations,closeLocations, openProfile, closeProfile} from "../Actions/MenuActions";
import ItemPost from './DashPostForms/itemPost';
import LocationPost from "./DashPostForms/locationPost";
import ItemDelete from "./DashDeleteForms/itemDelete";
import LocationDelete from './DashDeleteForms/locationDelete';
import UserEdit from "./DashEditForms/userEdit"
import ItemEdit from "./DashEditForms/itemEdit"
import LocationEdit from './DashEditForms/locationEdit'

import {LoadItems,EditItems} from "../Actions/ItemActions";

import picture from "../pics/icons8-user-50.png";
import ShopPicture from "../pics/icons8-shop-50.png";
import LocationPicture from "../pics/icons8-location-50.png";
import EditPicture from "../pics/icons8-edit-48.png";
import AddPicture from "../pics/icons8-add-50.png";
import DeletePicture from "../pics/icons8-delete-bin-50.png";

import "../CSS/DashboardUtils.css"




const DashboardUtils = ()=>{

    // States and dispatch needed in order to keep everything moving in localStorage and the db********************************
    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);
    const Menu = useSelector(state=>state.Menu);
    const dispatch = useDispatch();

    // Useeffects to watch for edit changes and to get needed data from the db*************************************************
    // React.useEffect(()=>{
    //     dispatch(getCats())

    // },[])

    React.useEffect(()=>{

        dispatch(LoadItems(state.userid))

    },[])

    // functions to toggle the utility options**********************************************************************************
    const ToggleUser = (e)=>{
        e.preventDefault();
        const userForm = document.querySelector('.userForm')
        userForm.classList.toggle('visible');

    }

    const TogglePostItem = (e)=>{
        e.preventDefault();
        const post = document.querySelector('.itemPostForm')
        post.classList.toggle('visible');
    }

    const TogglePostLocation = (e)=>{
        e.preventDefault();
        const post = document.querySelector(".locationPostForm")
        post.classList.toggle('visible');
    }

    const ToggleDeleteItem=(e)=>{
        e.preventDefault();
        const DeleteItem = document.querySelector('.itemDeleteForm');
        DeleteItem.classList.toggle('visible');
    }

    const ToggleDeleteLocation =(e)=>{
        e.preventDefault();
        const DeleteLocation = document.querySelector('.locationDeleteForm');
        DeleteLocation.classList.toggle('visible')
    }



    // This is for the new and improved menu display*******************************

    const openProfileSecondary =(e)=>{
        e.preventDefault();
        

        if(Menu.profileOpen === false){
            dispatch(openProfile())
            const secondary = document.querySelector('.ProfileSecondary')
            secondary.classList.toggle('visible')

        }else{
            dispatch(closeProfile())
            const secondary = document.querySelector('.ProfileSecondary')
            secondary.classList.toggle('visible')

            const list = document.querySelectorAll('.UserOption .visible')
            list.forEach((node)=>{
                node.classList.toggle('visible')
            })
        }

    }

    const openItemSecondary = (e)=>{
        e.preventDefault()
        if(Menu.itemOpen === false){
            dispatch(openItems())

            const yeet = document.querySelector(".ItemSecondary")
            yeet.classList.toggle('visible')
        }else{
            dispatch(closeItems())
            const yeet = document.querySelector(".ItemSecondary")
            yeet.classList.toggle('visible')


            const list = document.querySelectorAll(' .ItemOption .visible')


            list.forEach((node)=>{
                node.classList.toggle('visible')
            })

        }

    }

    const openLocationSecondary = (e)=>{
        e.preventDefault()
        if(Menu.locationOpen === false){
            dispatch(openLocations())

            const yeet = document.querySelector(".LocationSecondary")
            yeet.classList.toggle('visible')
        }else{
            dispatch(closeLocations())
            const yeet = document.querySelector(".LocationSecondary")
            yeet.classList.toggle('visible')


            const list = document.querySelectorAll('.LocationOption .visible')
            

            list.forEach((node)=>{
                node.classList.toggle('visible')
            })

        }
    }


    const openThird = (e, string)=>{
        e.preventDefault()
        const yeet = document.querySelector(string)
        yeet.classList.toggle('visible')
    }


    return(
        <section className="DashboardUtils">
            <div className="MenuWrap">
                <div className="Dashboard-CRUD UserOption">
                    <div onClick={(e)=>openProfileSecondary(e)} className="Primary">
                        {
                            Menu.profileOpen?

                                <div>
                                    <img src={picture} alt="buttface"/>
                                </div>

                            :

                            <>
                                <div>
                                    <img src={picture} alt="buttface"/>
                                </div>
                                
                                <div>
                                    <h2 >Profile</h2>
                                    <p>Edit your profile here</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className="ProfileSecondary">
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img width="50px" height="50px" onClick={(e)=>ToggleUser(e)} src={EditPicture} alt="Edit"/>
                            </div>
                            <div>
                                <h2>Edit the profile</h2>
                            </div>
                        </div>
                    </div>
                    <UserEdit id = {state.user.id}/>
                </div>
                <div className="Dashboard-CRUD ItemOption">
                    <div onClick={(e)=>openItemSecondary(e)} className="Primary">

                        {Menu.itemOpen? 
                            <div>
                                <img width="50px" height="50px" src={ShopPicture} alt="buttface"/>
                            </div>

                            :
                            <>
                                <div>
                                    <img width="50px" height="50px" src={ShopPicture} alt="buttface"/>
                                </div>
                                <div>
                                    <h2 >Items</h2>
                                    <p>Edit your items here</p>
                                </div>
                            </>
                        }
                        
                    </div>
                    <div className="ItemSecondary">
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img height="50px" width="50px" onClick={(e)=>openThird(e,'.Third')} src={EditPicture} alt="edit items"/>    
                            </div>
                            <div>
                                <h2>Edit an Item</h2>
                            </div>
                        </div>
                        <ItemEdit 
                            items={Item.items}
                            userid = {state.userid}
                            categories = {Category.categories}
                            locations = {state.user.locations}
                            />
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>TogglePostItem(e)} src={AddPicture} alt="add item"/>
                            </div>
                            <div>
                                <h2>Add an Item</h2>
                            </div>
                        </div>
                        <ItemPost/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>ToggleDeleteItem(e)} src={DeletePicture} alt="delete item"/>
                            </div>
                            <div>
                                <h2>Delete an Item</h2>
                            </div>
                        </div>
                        <ItemDelete/>
                    </div>
                </div>
                <div className="Dashboard-CRUD LocationOption">
                    <div onClick={(e)=>openLocationSecondary(e)} className="Primary">

                        {
                            Menu.locationOpen?
                            
                            <div>
                                <img src={LocationPicture} alt="buttface"/>
                            </div>
                            :
                            <>
                                <div>
                                    <img src={LocationPicture} alt="buttface"/>
                                </div>
                                
                                <div>
                                    <h2>Locations</h2>
                                    <p>Edit your Locations here</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className="LocationSecondary">
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img height="50px" width="50px" onClick={(e)=>openThird(e,'.LocationThird')} src={EditPicture} alt="edit location"/>
                            </div>
                            <div>
                                <h2>Edit a location</h2>
                            </div>
                        </div>
                        <LocationEdit locations={state.user.locations}/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>TogglePostLocation(e)} src={AddPicture} alt="Add location"/>
                            </div>
                            <div>
                                <h2>Add a location</h2>
                            </div>
                        </div>
                        <LocationPost/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>ToggleDeleteLocation(e)} src={DeletePicture} alt="Delete location"/>
                            </div>
                            <div>
                                <h2>Delete a location</h2>
                            </div>
                        </div>
                        <LocationDelete/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardUtils