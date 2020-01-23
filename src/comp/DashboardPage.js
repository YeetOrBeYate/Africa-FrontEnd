import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import DashboardUtils from "./DashboardUtils";
import {getCats} from "../Actions/CategoryActions";



const Dashboard =()=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const dispatch = useDispatch();


    React.useEffect(()=>{
        dispatch(getCats())

    },[])
    
    if(Category.categories ===null){
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
                            </div>
                        ))}
                    </section>
                    <section className="Dash-item Items">
                        <h1 className="subDashTitle">Your Items:</h1>
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