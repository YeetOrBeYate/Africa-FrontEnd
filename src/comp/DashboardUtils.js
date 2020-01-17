import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditUser,EditUserItem,CloseEditUserItem,EditUserLocation,CloseEditUserLocation} from "../Actions/UserActions";
import ItemPost from './DashPostForms/itemPost';
import LocationPost from "./DashPostForms/locationPost";
import ItemDelete from "./DashDeleteForms/itemDelete";
import LocationDelete from './DashDeleteForms/locationDelete';

import picture from "../pics/icons8-user-50.png";
import ShopPicture from "../pics/icons8-shop-50.png"


const DashboardUtils = ()=>{

    // States and dispatch needed in order to keep everything moving in localStorage and the db********************************
    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const dispatch = useDispatch();

    // Useeffects to watch for edit changes and to get needed data from the db*************************************************
    // React.useEffect(()=>{
    //     dispatch(getCats())

    // },[])

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

    },[state.itemEdit,state.locationEdit])

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
        
           const newItem = state.user.items.find((item)=>{
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
        

        dispatch(EditUserItem(item.id, newItem))
        
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


    const openProfileSecondary =(e)=>{
        console.log('ran')
        e.preventDefault();
        const secondary = document.querySelector('.ProfileSecondary')
        secondary.classList.toggle('visible')

    }

    const openItemSecondary = (e)=>{
        e.preventDefault()
        const yeet = document.querySelector(".ItemSecondary")
        yeet.classList.toggle('visible')
    }

    const openThird=(e)=>{
        e.preventDefault()
        const yeet = document.querySelector('.Third')
        yeet.classList.toggle('visible')
    }


    return(
        <section className="DashboardUtils">
            <div className="Dashboard-CRUD UserOption">
                <div className="Primary">
                    <div>
                        <img src={picture} alt="buttface"/>
                    </div>
                     
                     <div>
                         <h2 onClick={(e)=>openProfileSecondary(e)}>Profile</h2>
                         <p>Edit your profile here</p>
                     </div>
                </div>
                <div className="ProfileSecondary">
                {/* Then if you click this button, the edit form comes up */}
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>ToggleUser(e)}>Edit profile icon</button>
                        <h3>Edit the profile</h3>
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
                {/* <div className="UserToggle">
                    <h1>Item form</h1>
                    <select id="ItemSelect" onChange={(e)=>selectItem(e)}>
                        <option value="0">Select Item</option>
                        {state.user.items.map((item,index)=>(
                            <option value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <button onClick={(e)=>ToggleItem(e)} id="Itembtn">Edit Item</button>
                    <button onClick={(e)=>TogglePostItem(e)}>Add Item</button>
                    <button onClick={(e)=>ToggleDeleteItem(e)}>Remove Item</button>
                </div> */}
                <div className="Primary">
                    <div>
                        <img src={ShopPicture} alt="buttface"/>
                    </div>
                    
                    <div>
                        <h2 onClick={(e)=>openItemSecondary(e)}>Profile</h2>
                        <p>Edit your profile here</p>
                    </div>
                </div>
                <div className="ItemSecondary">
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>openThird(e)}>Edit an item</button>
                        <h3>Edit Item</h3>
                    </div>
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>TogglePostItem(e)}>Add Item</button>
                        <h3>Edit Item</h3>
                    </div>
                    <div className="SecondaryFlex">
                        <button onClick={(e)=>ToggleDeleteItem(e)}>Delete an Item</button>
                        <h3>Edit Item</h3>
                    </div>
                </div>
                <div className ="Third">
                    <select id="ItemSelect" onChange={(e)=>selectItem(e)}>
                        <option value="0">Select Item</option>
                        {state.user.items.map((item,index)=>(
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
                <ItemPost/>
                <ItemDelete/>
            </div>
            <div className="Dashboard-CRUD LocationOption">
                <div className="UserToggle">
                    <h1>Location form</h1>
                    <select id="LocationSelect" onChange={selectLocation}>
                        <option value="0">Select Location</option>
                        {state.user.locations.map((loc)=>(
                            <option value={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                    <button onClick={(e)=>ToggleLocation(e)} id="Locationbtn">Edit Location</button>
                    <button onClick={(e)=>TogglePostLocation(e)}>Add Location</button>
                    <button onClick={(e)=>ToggleDeleteLocation(e)}>Delete Location</button>
                </div>
                <form className="locationForm">
                    <div>
                        <input type="text" name="name" value={location.name} onChange={changeLocation} placeholder="name"/>
                    </div>
                    <button onClick={(e)=>submitLocation(e)}>Tesstbtn</button>
                </form>
                <LocationPost/>
                <LocationDelete/>
            </div>
        </section>
    );

}

export default DashboardUtils