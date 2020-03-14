import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DashboardUtils from "./DashboardUtils";
import {getCats} from "../Actions/CategoryActions";
import {LoadUser} from "../Actions/UserActions";

import "../CSS/DashboardPage.css";

const Dashboard =()=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const dispatch = useDispatch();


    React.useEffect(()=>{
        dispatch(getCats())
        dispatch(LoadUser(state.userid))
    },[])
    
    if(Category.categories ===null || state.user === null){
        return(<div>
            loading...
        </div>);
    }

    return(
        <div className="Dashboard">
            <DashboardUtils/>
            <section className="DashboardPage">
                <h1 className="DashTitle">Welcome:{state.user.username}</h1>
                <div className="Dashboard-flex">
                    <section className="Dash-item Locations">
                        <h1 className="subDashTitle">Your Locations:</h1>
                        {state.user.locations.map((loc,index)=>(
                            <div className={`location location-${index}`} >
                                <h3>{loc.name}</h3>
                                {loc.items.map((item,index)=>(
                                    <div className = 'locationItem' >
                                        <h3>{item.name}</h3>
                                        <h3>{item.description}</h3>
                                        <h3>{item.price}</h3>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </section>
                </div>
            </section>
        </div>
    );

}

export default Dashboard;