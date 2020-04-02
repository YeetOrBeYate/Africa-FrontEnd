import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadUsers} from "../Actions/UserActions"
import {LoadMarketItems} from "../Actions/ItemActions"
import MarketUserCard from './MarketUserCard'
import MarketLocationCard from "./MarketLocationCard"

const MarketFeed = ()=>{

    const User = useSelector(state=>state.User)
    const Item = useSelector(state=>state.Item)
    const dispatch = useDispatch()

    React.useEffect(()=>{

        dispatch(LoadUsers())
        dispatch(LoadMarketItems())

    },[])

    const GetItems =(Lid)=>{
        const items = Item.items.filter((item)=>{
            if(item.location_id === Lid){
                return item
            }
        })

        return items
    }

    if(User.userlist == null){
        return(<div>loading..</div>)
    }

    return(
        <div>
            {User.userlist.map((user)=>(
                <>
                    <MarketUserCard username={user.username}/>
                    {user.locations.map((location)=>(
                        <MarketLocationCard 
                        name = {location.name}
                        itemCount = {location.itemCount}
                        items = {GetItems(location.id)}
                        />
                    ))}
                </>
            ))}
        </div>
    )
}

export default MarketFeed