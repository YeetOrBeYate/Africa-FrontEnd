import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LoadUsers} from "../Actions/UserActions"
import {LoadMarketItems} from "../Actions/ItemActions"
import {getCats} from "../Actions/CategoryActions";
import MarketUserCard from './MarketUserCard'
import PageButton from "./PageButton"

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

    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(4);

    
    //get current posts
    //1 * 4 = 4
    //2 * 4 = 8
    //3 * 4 = 12
    const indexOfLastPost = currentPage * postsPerPage;
    //4-4 = 0
    //8-4 = 4
    //12-4 = 8
    const indexOfFirstPost = indexOfLastPost-postsPerPage;
    //first we'll slice through (0,4) then (4,8) then (8,12)

    const nextPage = (e)=>{
        e.preventDefault()
        setCurrentPage(currentPage=>currentPage+1)
    }

    const prevPage = (e)=>{
        e.preventDefault()
        setCurrentPage(currentPage=>currentPage-1)
    }

    const loadPageButtons = ()=>{
        let ar = []
        let list = Number(User.userlist.length).toFixed(2)
        list = Math.ceil(list/4)
        while(list !== 0){
            ar.unshift(list)
            list -=1
        }
        return ar
    }

    if(!User.userlist || !Item.items){
        return(<div>loading..</div>)
    }

    return(
        <div className = "marketFeed">
            <div className = "container">
                {User.userlist.slice(indexOfFirstPost,indexOfLastPost).map((user, index)=>(
                        <MarketUserCard 
                            key={index} 
                            user={user} 
                            items = {Item.items}
                        />
                ))}
            </div>
            <div className = "marketPage">
                <button onClick={(e)=>prevPage(e)}>prev</button>
                {loadPageButtons().map((number, index)=>(
                    <PageButton 
                        key={index}
                        number={number} 
                        changePage={setCurrentPage}
                    />
                ))}
                <button onClick={(e)=>nextPage(e)}>next</button>
            </div>
        </div>
    )
}

export default MarketFeed