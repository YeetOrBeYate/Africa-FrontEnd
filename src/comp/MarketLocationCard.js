import React from 'react';

const MarketLocationCard = (props)=>{

    return(
        <div>
            <h3>{props.name}({props.itemCount})</h3>
            {props.items.map((item)=>(
                <h4>{item.name}</h4>
            ))}
        </div>
    )
}

export default MarketLocationCard