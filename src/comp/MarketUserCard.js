import React from 'react';
import MarketLocationCard from "./MarketLocationCard"

import "../CSS/MarketPage.css"
const MarketUserCard = (props)=>{

    const GetItems =(Lid)=>{
        const items = props.items.filter((item)=>{
            if(item.location_id === Lid){
                return item
            }
        })
        return items
    }

    return(
        <div className = "userCard">
            <h1 id = "userName">{props.user.username}'s locations</h1>
            <div className= "UserMCardRender">
                {props.user.locations.map((location)=>(
                    <MarketLocationCard 
                    name = {location.name}
                    itemCount = {location.itemCount}
                    items = {GetItems(location.id)}
                    />
                    ))}
            </div>
        </div>
    )
}

export default MarketUserCard