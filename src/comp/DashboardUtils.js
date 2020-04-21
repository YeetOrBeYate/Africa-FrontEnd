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

    const ToggleForm =(e, qs, type)=>{
        e.preventDefault()
        closeItemFroms(e, qs, type)
        const form = document.querySelector(qs)
        form.classList.toggle('visible')
    }



    // This is for the new and improved menu display*******************************

    const openProfileSecondary =(e)=>{
        e.preventDefault();
        

        if(Menu.profileOpen === false){
            dispatch(openProfile())
            const secondary = document.querySelector('.ProfileSecondary')
            secondary.classList.toggle('visible')

            let others = document.querySelectorAll('.Dashboard-CRUD .visible')
            
            others.forEach((form)=>{
                if(form.classList.contains('ProfileSecondary')){
                    //do nothing
                }else{
                    form.classList.toggle('visible')
                }
            })
            switch(true){
                case Menu.itemOpen ===true:
                    dispatch(closeItems())
                case Menu.locationOpen ===true:
                    dispatch(closeLocations())
            }

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

            let others = document.querySelectorAll('.Dashboard-CRUD .visible')
            
            others.forEach((form)=>{
                if(form.classList.contains('ItemSecondary')){
                    //do nothing
                }else{
                    form.classList.toggle('visible')
                }
            })
            switch(true){
                case Menu.profileOpen ===true:
                    dispatch(closeProfile())
                case Menu.locationOpen ===true:
                    dispatch(closeLocations())
            }
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

            let others = document.querySelectorAll('.Dashboard-CRUD .visible')
            
            others.forEach((form)=>{
                if(form.classList.contains('LocationSecondary')){
                    //do nothing
                }else{
                    form.classList.toggle('visible')
                }
            })
            switch(true){
                case Menu.profileOpen ===true:
                    dispatch(closeProfile())
                case Menu.itemOpen ===true:
                    dispatch(closeItems())
            }
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


    const openThird = (e, string, side)=>{
        e.preventDefault()
        closeItemFroms(e, string, side)
        const yeet = document.querySelector(string)
        yeet.classList.toggle('visible')
    }

    function closeItemFroms(e, string, side){
        e.preventDefault()
        let except = string.slice(1,30)

        if(side === "item"){
            let forms = document.querySelectorAll(".ItemSecondary .visible")
            forms.forEach((form)=>{
                if(form.classList.contains(except)){
                    console.log('exception', form)
                }else{
                    form.classList.toggle('visible')
                }
            })
        }else{
            let forms = document.querySelectorAll(".LocationSecondary .visible")
            forms.forEach((form)=>{
                if(form.classList.contains(except)){
                    console.log('exception', form)
                }else{
                    form.classList.toggle('visible')
                }
            })
        }
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
                                <img height="50px" width="50px" onClick={(e)=>openThird(e,'.Third','item')} src={EditPicture} alt="edit items"/>    
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
                                <img onClick={(e)=>ToggleForm(e,'.itemPostForm', 'item')} src="l" alt="add item"/>
                            </div>
                            <div>
                                <h2>Add an Item</h2>
                            </div>
                        </div>
                        <ItemPost/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>ToggleForm(e, ".itemDeleteForm", "item")} src={DeletePicture} alt="delete item"/>
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
                                <img height="50px" width="50px" onClick={(e)=>openThird(e,'.LocationThird', 'location')} src={EditPicture} alt="edit location"/>
                            </div>
                            <div>
                                <h2>Edit a location</h2>
                            </div>
                        </div>
                        <LocationEdit locations={state.user.locations}/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>ToggleForm(e,".locationPostForm","location")} src="d" alt="Add location"/>
                            </div>
                            <div>
                                <h2>Add a location</h2>
                            </div>
                        </div>
                        <LocationPost/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>ToggleForm(e, '.locationDeleteForm', "location")} src={DeletePicture} alt="Delete location"/>
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