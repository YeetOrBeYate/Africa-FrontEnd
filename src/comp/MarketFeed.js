import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadUsers} from "../Actions/UserActions"
import {LoadMarketItems} from "../Actions/ItemActions"
import {getCats} from "../Actions/CategoryActions";
import MarketUserCard from './MarketUserCard'

import "../CSS/MarketPage.css"

const MarketFeed = ()=>{

    const User = useSelector(state=>state.User)
    const Item = useSelector(state=>state.Item)
    const dispatch = useDispatch()

    React.useEffect(()=>{

        dispatch(LoadUsers())
        dispatch(LoadMarketItems())
        dispatch(getCats())

    },[])

    if(!User.userlist || !Item.items){
        return(<div>loading..</div>)
    }

    return(
        <div className = "marketFeed">
            <div className = "container">
                {User.userlist.map((user)=>(
                    <>
                        <MarketUserCard user={user} items = {Item.items}/>
                    </>
                ))}
            </div>
        </div>
    )
}

export default MarketFeed