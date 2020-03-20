import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DashboardUtils from "./DashboardUtils";
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
    
    if(Category.categories ===null || state.user === null || Item.items === null){
        return(<div>
            loading...
        </div>);
    }

    const toggleItems = (e,number)=>{
        e.preventDefault()

        const childclass = document.querySelectorAll(`.locationItem-${number}`)

        console.log(childclass)

        childclass.forEach((child)=>{
            child.classList.toggle('locationVisible')
        })

    }


    return(
        <div className="Dashboard">
            <DashboardUtils/>
            <section className="DashboardPage">
                <h1 className="DashTitle">Welcome:{state.user.username}</h1>
                    <section className="Dash-item Locations">
                        <h1 className="subDashTitle">Your Locations:</h1>
                        {state.user.locations.map((loc,index)=>(
                            <div className={`location location-${loc.id}`} >
                                <section className='location-labels'>
                                    <h3>{loc.name}</h3>
                                    <button type='button' onClick={(e)=>toggleItems(e,loc.id)}>toggle items</button>
                                </section>
                                {Item.items.map((item,index)=>{

                                    if(item.location_id == loc.id){
                                    return(
                                    <div className = {`locationItem locationItem-${loc.id}`} >
                                        <h3>{item.name}</h3>
                                        <h3>{item.description}</h3>
                                        <h3>{item.price}</h3>
                                    </div>)
                                    }
                                })}
                            </div>
                        ))}
                    </section>
            </section>
        </div>
    );

}

export default Dashboard;