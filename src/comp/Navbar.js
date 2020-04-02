import React from 'react';
import Modal from 'react-modal';
import {Switch, Route, Link} from 'react-router-dom';
// import Login from "./LoginPage";
// import Register from "./RegisterPage";
// import Home from "./HomePage";
// import Dashboard from './DashboardPage';
// import addItem from "./AddItem";
// import Test from "./Menutest";
import Footer from "./Footerbar";

import {useDispatch, useSelector} from "react-redux";
import {clearMenu} from "../Actions/MenuActions";
import {clearUser} from "../Actions/UserActions";

import "../CSS/Navbar.css"


const Navbar = ()=>{

    const dispatch = useDispatch();
    const Menu = useSelector(state=>state.Menu)
    const User = useSelector(state=>state.User)
    const Item = useSelector(state=>state.Item)
    const LoginR = useSelector(state=>state.Login)

    const [loading,setLoading] = React.useState(false)

    const token = localStorage.getItem('token')

    React.useEffect(()=>{

        if(User.loading || LoginR.loading || Item.loading){
            setLoading(true)
        }else{
            setLoading(false)
        }


    },[User.loading, LoginR.loading, Item.loading] )

    const customStyles = {
        content:{
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            backgroundColor: 'transparent',
            border:'none',
            width: "170px",
            height: "170px"
        },

        overlay:{
            opacity: '1.0',
            backgroundColor: 'transparent'
        }

    }

    const signOut = (e)=>{
        localStorage.clear();
        dispatch(clearMenu())
        dispatch(clearUser())
    }


    return(
        <div className = 'test'>
            <Modal 
            // className='loader'
            isOpen={loading}
            onRequestClose={()=>setLoading(false)}
            style={customStyles}
             >
                 <div className= 'loader'></div>
             </Modal>
            <div className="NavFlex">
                {
                    token? 
                    <>
                        <Link to="/">Home</Link>
                        <Link onClick={(e)=>signOut(e)} to='/login'>SignOut</Link>
                        <Link to='/dashboard'>Dashbaord</Link>
                        <Link to='/marketfeed'>MarketFeed</Link>
                    </>
                    :
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login!</Link>
                        <Link to="/register">Register!</Link>
                        <Link to="/additem">Additem</Link>
                        <Link to="/test">Testpage</Link>
                    </>
                }
            </div>
        </div>
    );
}

export default Navbar;