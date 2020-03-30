import React from 'react';
import {useSelector} from 'react-redux'
import "../CSS/DashboardPage.css";

const ItemCard = (props)=>{


    const Category = useSelector(state=>state.Category);

    const FindCatName = (catId)=>{
        //need to make sure that the argument is a number
        catId = Number(catId)
        let name = Category.categories.find((cat)=>{
            if(cat.id === catId){
                return cat.name
            }
        })

        return name.name
    }

    const selfToggle = (locationId)=>{
        try{
            const classMates = document.querySelectorAll(`.locationItem-${locationId}.locationVisible`)
            if(classMates.length>0){
                return `${locationId} locationVisible`
            }else{
                return `${locationId}`
            }
        }
        catch(err){
        }
    }

    return(
        <div className = {`locationItem locationItem-${selfToggle(props.id)}`}>
            <h3>{props.name}</h3>
            <h3>{props.description}</h3>
            <h3>{props.price}</h3>
            <h3>{FindCatName(props.category_id)}</h3>
        </div>
    )

}

export default ItemCard