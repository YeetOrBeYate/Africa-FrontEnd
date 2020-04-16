import React from 'react'
import {useSelector} from "react-redux"

const MarketItemCard = (props)=>{

    const Category = useSelector(state=>state.Category)


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

    return(
        <div className="marketItemCard">
            <h2>{props.name} ({FindCatName(props.category_id)})</h2>
            <h3>{props.description}</h3>
            <h3>{props.price}</h3>
        </div>
    )

}

export default MarketItemCard