import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DashboardUtils from "./DashboardUtils";
import ItemCard from './Itemcard';
import Locationcard from './Locationcard'
import {getCats} from "../Actions/CategoryActions";
import {LoadUser} from "../Actions/UserActions";
import {LoadItems} from "../Actions/ItemActions";

import picture from "../pics/icons8-user-50.png";
import ShopPicture from "../pics/icons8-shop-50.png";
import LocationPicture from "../pics/icons8-location-50.png";

import "../CSS/DashboardPage.css";


const Dashboard =()=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getCats())
        dispatch(LoadUser(state.userid))
        dispatch(LoadItems(state.userid))
    },[])

    const toggleUtils = ()=>{
        const cards = document.querySelector('.DashboardPage')

        cards.classList.toggle('hide')

        const utils = document.querySelector('.DashboardUtils')

        utils.classList.toggle('utilVisible')
    }

    

    if(Category.categories ===null || state.user === null || Item.items === null){
        return(<div>
            loading...
        </div>);
    }

    return(
        <div className="parent">
            <h1 className="DashTitle">Welcome:{state.user.username}</h1>
            <div className="DashboardModals">
                <div id="Profile" className="ModalOption">
                    <img src={picture} alt="profile icon"/>
                    <h4>Edit your profile here</h4>
                </div>
                <div id="Item" className="ModalOption">
                    <img  src={ShopPicture} alt="profile icon"/>
                    <h4>Add and item here</h4>
                </div>
                <div id="Location" className="ModalOption">
                    <img src={LocationPicture} alt="profile icon"/>
                    <h4>Add a location here</h4>
                </div>
            </div>
            <div className="Dashboard">
                {/* <DashboardUtils/> */}
                <section className="DashboardPage">
                        <section className="Dash-item Locations">
                            {state.user.locations.map((loc,index)=>(
                                <Locationcard
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