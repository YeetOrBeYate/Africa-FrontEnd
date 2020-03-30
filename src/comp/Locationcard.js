import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemCard from './Itemcard';

const Locationcard = (props)=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);

    const toggleItems = props.toggleItems

    const Gimme = ()=>{
        const size = Item.items.filter((item)=>{
            if(item.location_id == props.id){
                return item
            }
        })
        return size.length
    }

    return(
    <div className={`location location-${props.id}`} >
        <section className='location-labels'>
            <h3>{props.name}</h3>
            <h3>Items:{Gimme()}</h3>
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