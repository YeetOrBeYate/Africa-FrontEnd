import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-modal';
import DashboardUtils from "./DashboardUtils";
import {getCats} from "../Actions/CategoryActions";
import {LoadUser, FixUserFailure} from "../Actions/UserActions";

import {LoadItems,FixItemFailure} from "../Actions/ItemActions";

import "../CSS/DashboardPage.css";


const Dashboard =()=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Item = useSelector(state=>state.Item);
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = React.useState(false);
    const customStyles = {
        content:{
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            width: '30%',
            height: '30%',
            background: '#eef2c3'
        },

    }


    React.useEffect(()=>{
        dispatch(getCats())
        dispatch(LoadUser(state.userid))
        dispatch(LoadItems(state.userid))
    },[])

    React.useEffect(()=>{

        if(state.failure){
            setModalOpen(true)
        }

        if(Item.failure){
            setModalOpen(true)
        }


    }, [state.failure, Item.failure])
    
    
    const toggleItems = (e,number)=>{
        e.preventDefault()
        
        const childclass = document.querySelectorAll(`.locationItem-${number}`)
        
        console.log(childclass)
        
        childclass.forEach((child)=>{
            child.classList.toggle('locationVisible')
        })
        
    }

    const closeModel = ()=>{

        setModalOpen(false)
        dispatch(FixUserFailure())
        dispatch(FixItemFailure())

    }
    
    if(Category.categories ===null || state.user === null || Item.items === null){
        return(<div>
            loading...
        </div>);
    }
    
    return(
        <div className="Dashboard">
            <DashboardUtils/>
            <section className="DashboardPage">
                <Modal
                isOpen = {modalOpen}
                onRequestClose={closeModel}
                style={customStyles}
                >
                    <h2>An error occured</h2>
                    <p>we were unable to make the request, please try again</p>
                </Modal>
                <h1 className="DashTitle">Welcome:{state.user.username}</h1>
                    <section className="Dash-item Locations">
                        {state.user.locations.map((loc,index)=>(
                            <div className={`location location-${loc.id}`} >
                                <section className='location-labels'>
                                    <h3>{loc.name}</h3>
                                    <button type='button' onClick={(e)=>toggleItems(e,loc.id)}>toggle items</button>
                                </section>
                                {Item.items.map((item,index)=>{

                                    if(item.location_id == loc.id){
                                    return(
                                    <div className = {`locationItem locationItem-${loc.id}`} >
                                        <h3>{item.name}</h3>
                                        <h3>{item.description}</h3>
                                        <h3>{item.price}</h3>
                                    </div>)
                                    }
                                })}
                            </div>
                        ))}
                    </section>
            </section>
        </div>
    );

}

export default Dashboard;