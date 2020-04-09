import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DashboardUtils from "./DashboardUtils";
import ItemCard from './Itemcard';
import Locationcard from './Locationcard'
import {getCats} from "../Actions/CategoryActions";
import {LoadUser} from "../Actions/UserActions";

import {LoadItems} from "../Actions/ItemActions";

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
            <button onClick={()=>toggleUtils()} id ="toggleUtils">Settings</button>
            <div className="Dashboard">
                <DashboardUtils/>
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