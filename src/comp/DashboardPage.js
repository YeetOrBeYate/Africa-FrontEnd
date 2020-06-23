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
import "../CSS/DashboardUtils.css"


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

    const determineDisable = ()=>{
        if(!state.user.locations.length===0){
            return `ModalOption modalDisable`
        }else{
            return `ModalOption`
        }
    }

    return(
        <div className="parent">
        {console.log(state.user)}
        {console.log(Boolean(state.user.locations.length===0))}
            <h1 className="DashTitle">Welcome:{state.user.username}</h1>
            <div className="DashboardModals">
                <button onClick={()=>setUserModelOpen(true)} id="Profile" className="ModalOption">
                    <img src={picture} alt="profile icon"/>
                    <h4>Edit your profile</h4>
                </button>
                <button disabled={true} onClick={()=>setItemModalOpen(true)} id="Item" className={determineDisable()}>
                    <img  src={ShopPicture} alt="profile icon"/>
                    <h4>Add and item</h4>
                </button>
                <button onClick={()=>setLocationModalOpen(true)} id="Location" className="ModalOption">
                    <img src={LocationPicture} alt="profile icon"/>
                    <h4>Add a location</h4>
                </button>
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