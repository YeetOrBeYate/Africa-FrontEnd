import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadUsers} from "../Actions/UserActions"

const MarketFeed = ()=>{

    const User = useSelector(state=>state.User)
    const Item = useSelector(state=>state.Item)
    const dispatch = useDispatch()

    React.useEffect(()=>{

        dispatch(LoadUsers())

    },[])

    if(User.userlist == null){
        return(<div>loading..</div>)
    }

    return(
        <div>
            {User.userlist.map((user)=>(
                <div>
                    <h1>{user.username}</h1>
                </div>
            ))}
        </div>
    )


}

export default MarketFeed