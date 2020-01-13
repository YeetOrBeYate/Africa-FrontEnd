import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DashboardUtils from "./DashboardUtils";



const Dashboard =()=>{

    const state = useSelector(state=>state.User);
    

    return(
        <div className="Dashboard">
            <DashboardUtils/>
            <section className="DashboardPage">
                <h1>Welcome:{state.user.username}</h1>
                <div className="Dashboard-flex">
                    <section className="Dash-item Locations">
                        <h1>Your Locations:</h1>
                        {state.user.locations.map((loc,index)=>(
                            <div className={`location location-${index}`} >
                                <h3>{loc.name}</h3>
                            </div>
                        ))}
                    </section>
                    <section className="Dash-item Items">
                        <h1>Your Items:</h1>
                        {state.user.items.map((item,index)=>(
                            <div className={`item item-${index}`} key={index} >
                                <h3>{item.name}</h3>
                                <h3>{item.price}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </section>
        </div>
    );

}

export default Dashboard;