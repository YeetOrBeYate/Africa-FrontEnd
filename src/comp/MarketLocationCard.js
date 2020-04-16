import React from 'react';
import Modal from "react-modal"
import MarketItemCard from './MarketItemCard'

import "../CSS/MarketPage.css"

const MarketLocationCard = (props)=>{

    const [open, setOpen] = React.useState(false)


    return(
        <div className="locationCard">
            <h3 id="marketLocationName" onClick = {()=>setOpen(true)}>{props.name}({props.itemCount})</h3>
            <Modal
                isOpen = {open}
                onRequestClose = {()=>setOpen(false)}
                className = "itemModal"
            >
                {props.items.map((item)=>(
                    <MarketItemCard
                        name = {item.name}
                        description = {item.description}
                        price = {item.price}
                        category_id = {item.category_id}
                    />
                ))}
            </Modal>
        </div>
    )
}

export default MarketLocationCard