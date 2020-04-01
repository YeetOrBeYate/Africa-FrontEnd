import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemCard from './Itemcard';

const Locationcard = (props)=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);


    const [itemCount, setItemCount] = React.useState(props.Count)
    const [open, setOpen] = React.useState(false)


    const Gimme = (Lid)=>{
        const size = Item.items.filter((item)=>{
            if(item.location_id == props.id){
                return item
            }
        })

        let el = document.querySelector(`.location-${Lid}`)

        if(size.length>itemCount){
             //conduct the addition animation, and change the item count to the new current list size
            el.style.animation = "addition 1s 1";
            //this is to clear/reset the animation
            el.addEventListener('animationend', ()=>{
                el.style.animation = "none"
            })
            setItemCount(size.length)
        }else if(size.length<itemCount){
            //conduct the subtract animation, and change the item count to the new current list size
            el.style.animation = "subtract 1s 1";
            setItemCount(size.length)
            //this is to clear/reset the animation
            el.addEventListener('animationend', ()=>{
                el.style.animation = "none"
            })
        }
        return size.length
    }

    const toggleItems = (e,number)=>{
        e.preventDefault()

        //grabbing the objects I need to perform DOM operations on
        const button = document.querySelector(`.location-${number} .location-button`)
        const arrow = document.querySelector(`.location-${number} .down`)
        const childclass = document.querySelectorAll(`.locationItem-${number}`)
        //this one needs to happen the same evertime no matter what
        childclass.forEach((child)=>{
            child.classList.toggle('locationVisible')
        })
        //if our card is closed
        if(!open){
            button.style.animation = "1s ease-in-out 0s 1 normal both running toggleButtonOpen"
            arrow.classList.toggle('rotateRight')
            setOpen(true)
        }else{
        //if out card is open
        button.style.animation = "1s ease-in-out 0s 1 reverse both running toggleButtonClose"
        arrow.classList.toggle('rotateRight')
        setOpen(false)
        }

        // button.addEventListener('animationend',()=>{
        //     button.style.animation = "none"
        // })
        
    }


    return(
    <div className={`location location-${props.id}`} >
        <section className='location-labels'>
            <h3>{props.name}</h3>
            <div className="location-button" onClick={(e)=>toggleItems(e,props.id)}>
                <p>View items</p>
                <p>({Gimme(props.id)})</p>
                <div className="down"></div>
            </div>
        </section>
        {Item.items.map((item,index)=>{
            if(item.location_id == props.id){
            return(
            <ItemCard 
                id = {item.location_id} 
                name = {item.name} 
                description = {item.description} 
                price = {item.price} 
                category_id = {item.category_id}
            />)
            }
        })}
    </div>)
}

export default Locationcard