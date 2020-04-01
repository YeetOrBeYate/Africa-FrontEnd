import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemCard from './Itemcard';

const Locationcard = (props)=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);


    const [itemCount, setItemCount] = React.useState(props.Count)

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

        const button = document.querySelector(`.location-${number} .location-button`)
        
        const childclass = document.querySelectorAll(`.locationItem-${number}`)
        
        childclass.forEach((child)=>{
            
            child.classList.toggle('locationVisible')
        })

        button.style.animation = "1s ease-in-out 0s 1 normal both running toggleButtonOpen"

        button.addEventListener('animationend',()=>{
            button.style.animation = "none"
        })
        
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