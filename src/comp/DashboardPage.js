import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {EditUser} from "../Actions/UserActions";
import {getCats} from "../Actions/CategoryActions";

const AddItem =()=>{

    const state = useSelector(state=>state.User);
    const Category = useSelector(state=>state.Category);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(getCats())
    },[])

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
        console.log("Item i'm sending", item)

        // All that's left so to make the put request
    }

    
    if(Category.categories ===null){
        return(<div>
            loading...
        </div>);
    }
    return(
        <div className="Dashboard">
            <section className="DashboardUtils">
                <div className="Dashboard-CRUD UserOption">
                    <div className="UserToggle">
                        <h1>Profile form</h1>
                        <button onClick={(e)=>ToggleUser(e)} id="Userbtn">Edit Profile</button>
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
                    <div className="UserToggle">
                        <h1>Item form</h1>
                        <select id="ItemSelect" onChange={(e)=>selectItem(e)}>
                            <option value="0">Select Item</option>
                            {state.user.items.map((item,index)=>(
                                <option value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <button onClick={(e)=>ToggleItem(e)} id="Itembtn">Edit Item</button>
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
                </div>
                <div className="Dashboard-CRUD LocationOption">
                    <div className="UserToggle">
                        <h1>Location form</h1>
                        <select>
                            <option value="0">Select Location</option>
                        </select>
                        <button onClick={(e)=>ToggleLocation(e)} id="Locationbtn">Edit Location</button>
                    </div>
                    <form className="locationForm">
                        <div>
                            <input type="text" name="name" placeholder="name"/>
                        </div>
                        <button>Tesstbtn</button>
                    </form>
                </div>

            </section>
            <section className="DashboardPage">
                <h1>Welcome:{state.user.username}</h1>
                <div className="Dashboard-flex">
                    <section className="Dash-item Locations">
                        <h1>Your Locations:</h1>
                        {state.user.locations.map((loc,index)=>(
                            <div className={`location location-${index}`} >
                                <h3>{loc.name}</h3>
                            </div>
                        ))}
                    </section>
                    <section className="Dash-item Items">
                        <h1>Your Items:</h1>
                        {state.user.items.map((item,index)=>(
                            <div className={`item item-${index}`} key={index} >
                                <h3>{item.name}</h3>
                                <h3>{item.price}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </section>
        </div>
    );

}

export default AddItem;