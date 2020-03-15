import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditUser,CloseEditUserItem,EditUserLocation,CloseEditUserLocation} from "../Actions/UserActions";
import {openItems, closeItems, openLocations,closeLocations, openProfile, closeProfile} from "../Actions/MenuActions";
import ItemPost from './DashPostForms/itemPost';
import LocationPost from "./DashPostForms/locationPost";
import ItemDelete from "./DashDeleteForms/itemDelete";
import LocationDelete from './DashDeleteForms/locationDelete';

import {LoadItems,EditItems} from "../Actions/ItemActions";

import picture from "../pics/icons8-user-50.png";
import ShopPicture from "../pics/icons8-shop-50.png";
import LocationPicture from "../pics/icons8-location-50.png";
import EditPicture from "../pics/icons8-edit-48.png";
import AddPicture from "../pics/icons8-add-50.png";
import DeletePicture from "../pics/icons8-delete-bin-50.png";


const DashboardUtils = ()=>{

    // States and dispatch needed in order to keep everything moving in localStorage and the db********************************
    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const Menu = useSelector(state=>state.Menu);
    const dispatch = useDispatch();
    const Item = useSelector(state=>state.Item);

    // Useeffects to watch for edit changes and to get needed data from the db*************************************************
    // React.useEffect(()=>{
    //     dispatch(getCats())

    // },[])

    React.useEffect(()=>{

        dispatch(LoadItems(state.userid))

    },[])

    React.useEffect(()=>{
        if(state.itemEdit){
            const newList=state.user.items.map(i=>{
                if(item.id == i.id){
                    i = item
                    return i;
                }else{
                    return i;
                }
            })

            dispatch(CloseEditUserItem(newList))
        }

        if(state.locationEdit){
            
            const newLocations=state.user.locations.map(l=>{
                if(location.id == l.id){
                    l = location
                    return l;
                }else{
                    return l;
                }
            })

            console.log(newLocations)

            dispatch(CloseEditUserLocation(newLocations))
        }

    },[state.locationEdit])

    // usestates to keep track of the inputs************************************************************************************
    const [user, setUser] = React.useState({
        username:'',
        password:'',
        Repassword:''
    })

    const [item, setItem] = React.useState({
        id:'',
        name:'',
        description:'',
        price:'',
        user_id:state.user.id,
        category_id:''
    })

    const [location, setLocation] = React.useState({
        name:'',
        id:null
    })


    // functions to toggle the utility options**********************************************************************************
    const ToggleUser = (e)=>{
        e.preventDefault();
        const userForm = document.querySelector('.userForm')
        userForm.classList.toggle('visible');

    }

 
    const ToggleItem = (e)=>{
        e.preventDefault();
        const userForm = document.querySelector('.itemForm')
        userForm.classList.toggle('visible');

    }

    const ToggleLocation = (e)=>{
        e.preventDefault();
        const userForm = document.querySelector('.locationForm')
        userForm.classList.toggle('visible');

    }

    const TogglePostItem = (e)=>{
        e.preventDefault();
        const post = document.querySelector('.itemPostForm')
        post.classList.toggle('visible');
    }

    const TogglePostLocation = (e)=>{
        e.preventDefault();
        const post = document.querySelector(".locationPostForm")
        post.classList.toggle('visible');
    }

    const ToggleDeleteItem=(e)=>{
        e.preventDefault();
        const DeleteItem = document.querySelector('.itemDeleteForm');
        DeleteItem.classList.toggle('visible');
    }

    const ToggleDeleteLocation =(e)=>{
        e.preventDefault();
        const DeleteLocation = document.querySelector('.locationDeleteForm');
        DeleteLocation.classList.toggle('visible')
    }
    //The user form functions for changing the usestate attached to it and submitting********************************************
    const changeUser=(e)=>{
        
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitUser=(e)=>{
        e.preventDefault();

        let Theuser = {
            username:user.username,
            password:user.password
        }
        dispatch(EditUser(state.user.id, Theuser))

        setUser({...user, username:'',password:'',Repassword:''})
    }
     //The Item form functions for changing the usestate attached to it,submitting, and selecting category***********************
    const selectItem = (e)=>{
        const select = document.querySelector('#ItemSelect').value

        if(select !=0){
        
           const newItem = Item.items.find((item)=>{
               let select = document.querySelector('#ItemSelect').value
               return item.id == select;
           })

           setItem({...item, id:newItem.id, description: newItem.description, name:newItem.name, price:newItem.price})
           document.querySelector('#CategorySelect').value = 0;


        }else{
            console.log("pick something fool")
        }
    }

    const changeItem = (e)=>{
        setItem({...item, [e.target.name]: e.target.value})
    }

    const submitItem = (e)=>{
        e.preventDefault()
        
        const newItem ={
            name:item.name,
            description: item.description,
            price: item.price,
            user_id:item.user_id,
            category_id:item.category_id
        }
        

        //replace with item action to make the put request
        dispatch(EditItems(item.id, newItem))
        
    }

    const changeLocation = (e)=>{
        setLocation({...location, name:e.target.value})
        
    }

    const selectLocation = ()=>{
        const select = document.querySelector('#LocationSelect').value;

        if(select !=0){
            const newloc=state.user.locations.find((loc)=>{
                let Svalue = document.querySelector('#LocationSelect').value
                return loc.id == Svalue;
            })
            
            setLocation({...location, name:newloc.name, id: newloc.id})
            document.querySelector('#LocationSelect').value = 0;
        }

    }

    const submitLocation = (e)=>{
        e.preventDefault();

        const newLocation ={
            name: location.name
        }

        dispatch(EditUserLocation(location.id, newLocation))
        
    }

    // This is for the new and improved menu display*******************************

    const openProfileSecondary =(e)=>{
        e.preventDefault();
        

        if(Menu.profileOpen === false){
            dispatch(openProfile())
            const secondary = document.querySelector('.ProfileSecondary')
            secondary.classList.toggle('visible')

        }else{
            dispatch(closeProfile())
            const secondary = document.querySelector('.ProfileSecondary')
            secondary.classList.toggle('visible')

            const list = document.querySelectorAll('.UserOption .visible')
            list.forEach((node)=>{
                node.classList.toggle('visible')
            })
        }

    }

    const openItemSecondary = (e)=>{
        e.preventDefault()
        if(Menu.itemOpen === false){
            dispatch(openItems())

            const yeet = document.querySelector(".ItemSecondary")
            yeet.classList.toggle('visible')
        }else{
            dispatch(closeItems())
            const yeet = document.querySelector(".ItemSecondary")
            yeet.classList.toggle('visible')


            const list = document.querySelectorAll(' .ItemOption .visible')


            list.forEach((node)=>{
                node.classList.toggle('visible')
            })

        }

    }

    const openLocationSecondary = (e)=>{
        e.preventDefault()
        if(Menu.locationOpen === false){
            dispatch(openLocations())

            const yeet = document.querySelector(".LocationSecondary")
            yeet.classList.toggle('visible')
        }else{
            dispatch(closeLocations())
            const yeet = document.querySelector(".LocationSecondary")
            yeet.classList.toggle('visible')


            const list = document.querySelectorAll('.LocationOption .visible')
            

            list.forEach((node)=>{
                node.classList.toggle('visible')
            })

        }
    }

    const openThird=(e)=>{
        e.preventDefault()
        const yeet = document.querySelector('.Third')
        yeet.classList.toggle('visible')
    }

    const openLocationThird=(e)=>{
        e.preventDefault()
        const yeet = document.querySelector('.LocationThird')
        yeet.classList.toggle('visible')
    }

    if(Item.items==null){
        return(<div>loadings</div>)
    }

    return(
        <section className="DashboardUtils">
            <div className="MenuWrap">
                <div className="Dashboard-CRUD UserOption">
                    <div onClick={(e)=>openProfileSecondary(e)} className="Primary">
                        {
                            Menu.profileOpen?

                                <div>
                                    <img src={picture} alt="buttface"/>
                                </div>

                            :

                            <>
                                <div>
                                    <img src={picture} alt="buttface"/>
                                </div>
                                
                                <div>
                                    <h2 >Profile</h2>
                                    <p>Edit your profile here</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className="ProfileSecondary">
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img width="50px" height="50px" onClick={(e)=>ToggleUser(e)} src={EditPicture} alt="Edit"/>
                            </div>
                            <div>
                                <h2>Edit the profile</h2>
                            </div>
                        </div>
                    </div>
                    <form className="userForm">
                        <div>
                            <input type="text" onChange={changeUser} name="username" value={user.username} placeholder="username"/>
                        </div>
                        <div>
                            <input type="text" onChange={changeUser} name="password" value={user.password} placeholder="password"/>
                        </div>
                        <div>
                            <input type="text" onChange={changeUser} name="Repassword" value={user.Repassword} placeholder="re-enter the password"/> 
                        </div>
                        <button onClick={(e)=>submitUser(e)}>Edit Profile!</button>
                    </form>
                </div>
                <div className="Dashboard-CRUD ItemOption">
                    <div onClick={(e)=>openItemSecondary(e)} className="Primary">

                        {Menu.itemOpen? 
                            <div>
                                <img width="50px" height="50px" src={ShopPicture} alt="buttface"/>
                            </div>

                            :
                            <>
                                <div>
                                    <img width="50px" height="50px" src={ShopPicture} alt="buttface"/>
                                </div>
                                <div>
                                    <h2 >Items</h2>
                                    <p>Edit your items here</p>
                                </div>
                            </>
                        }
                        
                    </div>
                    <div className="ItemSecondary">
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img height="50px" width="50px" onClick={(e)=>openThird(e)} src={EditPicture} alt="edit items"/>    
                            </div>
                            <div>
                                <h2>Edit an Item</h2>
                            </div>
                        </div>
                        <div className ="Third">
                            <select id="ItemSelect" onChange={(e)=>selectItem(e)}>
                                <option value="0">Select Item</option>
                                {Item.items.map((item,index)=>(
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <button onClick={(e)=>ToggleItem(e)}>Open edit form</button>
                        </div>
                        <form className="itemForm">
                            <div>
                                <input type="text" name="name" onChange={changeItem} value={item.name} placeholder="name"/>
                            </div>
                            <div>
                                <input type="text" name="price" onChange={changeItem} value={item.price} placeholder="price"/>
                            </div>
                            <div>
                                <textarea type="text" name="description" onChange={changeItem} value={item.description} placeholder="description" cols="31"/>
                            </div>
                            <div>
                                <select id ='CategorySelect' name="category_id" onChange={changeItem}>
                                    <option value = "0">Select Category</option>
                                    {Category.categories.map((cat)=>(
                                            <option value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={(e)=>submitItem(e)}>Edit Item!</button>
                        </form>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>TogglePostItem(e)} src={AddPicture} alt="add item"/>
                            </div>
                            <div>
                                <h2>Add an Item</h2>
                            </div>
                        </div>
                        <ItemPost/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>ToggleDeleteItem(e)} src={DeletePicture} alt="delete item"/>
                            </div>
                            <div>
                                <h2>Delete an Item</h2>
                            </div>
                        </div>
                        <ItemDelete/>
                    </div>
                </div>
                <div className="Dashboard-CRUD LocationOption">
                    <div onClick={(e)=>openLocationSecondary(e)} className="Primary">

                        {
                            Menu.locationOpen?
                            
                            <div>
                                <img src={LocationPicture} alt="buttface"/>
                            </div>
                            :
                            <>
                                <div>
                                    <img src={LocationPicture} alt="buttface"/>
                                </div>
                                
                                <div>
                                    <h2>Locations</h2>
                                    <p>Edit your Locations here</p>
                                </div>
                            </>
                        }
                    </div>
                    <div className="LocationSecondary">
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img height="50px" width="50px" onClick={(e)=>openLocationThird(e)} src={EditPicture} alt="edit location"/>
                            </div>
                            <div>
                                <h2>Edit a location</h2>
                            </div>
                        </div>
                        <div className ="LocationThird">
                            <select id="LocationSelect" onChange={selectLocation}>
                                <option value="0">Select Location</option>
                                {state.user.locations.map((loc)=>(
                                    <option value={loc.id}>{loc.name}</option>
                                ))}
                            </select>
                            <button onClick={(e)=>ToggleLocation(e)}>Open edit form</button>
                        </div>
                        <form className="locationForm">
                            <div>
                                <input type="text" name="name" value={location.name} onChange={changeLocation} placeholder="name"/>
                            </div>
                            <button onClick={(e)=>submitLocation(e)}>Tesstbtn</button>
                        </form>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>TogglePostLocation(e)} src={AddPicture} alt="Add location"/>
                            </div>
                            <div>
                                <h2>Add a location</h2>
                            </div>
                        </div>
                        <LocationPost/>
                        <div className="SecondaryFlex">
                            <div className="menuButton">
                                <img onClick={(e)=>ToggleDeleteLocation(e)} src={DeletePicture} alt="Delete location"/>
                            </div>
                            <div>
                                <h2>Delete a location</h2>
                            </div>
                        </div>
                        <LocationDelete/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DashboardUtils