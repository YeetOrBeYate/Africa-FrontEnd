import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DashModal from "react-modal";
import Locationcard from './Locationcard'
import {getCats} from "../Actions/CategoryActions";
import {LoadUser} from "../Actions/UserActions";
import {LoadItems} from "../Actions/ItemActions";
import UserEdit from "./DashEditForms/userEdit"
import ItemPost from './DashPostForms/itemPost';
import LocationPost from "./DashPostForms/locationPost";

import picture from "../pics/icons8-user-50.png";
import ShopPicture from "../pics/icons8-shop-50.png";
import LocationPicture from "../pics/icons8-location-50.png";

import "../CSS/DashboardPage.css";


const Dashboard =()=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);
    const dispatch = useDispatch();

    const [userModalOpen, setUserModelOpen] = React.useState(false)
    const [itemModalOpen, setItemModalOpen] = React.useState(false)
    const [locationModalOpen, setLocationModalOpen] = React.useState(false)

    React.useEffect(()=>{
        dispatch(getCats())
        dispatch(LoadUser(state.userid))
        dispatch(LoadItems(state.userid))
    },[])

    

    if(Category.categories ===null || state.user === null || Item.items === null){
        return(<div>
            loading...
        </div>);
    }

    return(
        <div className="parent">
            <h1 className="DashTitle">Welcome:{state.user.username}</h1>
            <div className="DashboardModals">
                <div onClick={()=>setUserModelOpen(true)} id="Profile" className="ModalOption">
                    <img src={picture} alt="profile icon"/>
                    <h4>Edit your profile</h4>
                </div>
                <div onClick={()=>setItemModalOpen(true)} id="Item" className="ModalOption">
                    <img  src={ShopPicture} alt="profile icon"/>
                    <h4>Add and item</h4>
                </div>
                <div onClick={()=>setLocationModalOpen(true)} id="Location" className="ModalOption">
                    <img src={LocationPicture} alt="profile icon"/>
                    <h4>Add a location</h4>
                </div>
            </div>
            <DashModal
                id = 'Profile'
                isOpen ={userModalOpen}
                onRequestClose={()=>setUserModelOpen(false)}
                className = "DashboardModal"
            >
                    <UserEdit id = {state.user.id}/>

            </DashModal>
            <DashModal
                id = "Item"
                isOpen= {itemModalOpen}
                onRequestClose={()=>setItemModalOpen(false)}
                className="DashboardModal"
            >
                <ItemPost/>

            </DashModal>
            <DashModal
                id = "Location"
                isOpen={locationModalOpen}
                onRequestClose={()=>setLocationModalOpen(false)}
                className="DashboardModal"
            >
                <LocationPost/>

            </DashModal>
            <div className="Dashboard">
                <section className="DashboardPage">
                        <section className="Dash-item Locations">
                            {state.user.locations.map((loc,index)=>(
                                <Locationcard
                                    key={index}
                                    id = {loc.id}
                                    name = {loc.name}
                                    Count = {loc.itemCount || 0}
                                />
                            ))}
                        </section>   
                </section>
            </div>
        </div>
    );
}

export default Dashboard;