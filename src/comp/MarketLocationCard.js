import React from 'react';
import Modal from "react-modal"
import MarketItemCard from './MarketItemCard'

import "../CSS/MarketPage.css"

const MarketLocationCard = (props)=>{

    const [open, setOpen] = React.useState(false)

    const customStyles = {
        content: {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width: '40%',
            height: '60%',
            background: '#eef2c3'
        }
    }

    return(
        <div className="locationCard">
            <h3 onClick = {()=>setOpen(true)}>{props.name}({props.itemCount})</h3>
            <Modal
                isOpen = {open}
                onRequestClose = {()=>setOpen(false)}
                style = {customStyles}
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