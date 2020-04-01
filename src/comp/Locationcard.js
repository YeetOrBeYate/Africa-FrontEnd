import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemCard from './Itemcard';

const Locationcard = (props)=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);

    const toggleItems = props.toggleItems

    const [itemCount, setItemCount] = React.useState(props.Count)

    const Gimme = (Lid)=>{
        const size = Item.items.filter((item)=>{
            if(item.location_id == props.id){
                return item
            }
        })

        let el = document.querySelector(`.location-${Lid}`)

        if(size.length>itemCount){
            el.style.animation = "addition 1s 1";
            el.addEventListener('animationend', ()=>{
                el.style.animation = "none"
            })
            setItemCount(size.length)
        }else if(size.length<itemCount){
            console.log('trigger the minus animation for ', Lid)
            el.style.animation = "subtract 1s 1";
            setItemCount(size.length)
            el.addEventListener('animationend', ()=>{
                el.style.animation = "none"
            })
        }
        return size.length
    }

    const dummy = (id)=>{

        

    }

    return(
    <div className={`location location-${props.id}`} >
        <section className='location-labels'>
            <h3>{props.name}</h3>
            <h3>Items:{Gimme(props.id)}</h3>
            <button type='button' onClick={(e)=>toggleItems(e,props.id)}>toggle items</button>
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