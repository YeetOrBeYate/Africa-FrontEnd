import React from 'react';
import {EditUser} from "../../Actions/UserActions"
import {useDispatch, useSelector} from 'react-redux';

const UserEdit = (props)=>{

    const dispatch = useDispatch()


    const [user, setUser] = React.useState({
        username:'',
        password:'',
        Repassword:'',
        match: true
    })

    const changeUser=(e)=>{

        setUser({...user, [e.target.name]:e.target.value, match:true})
    }

    const submitUser=(e)=>{
        e.preventDefault();

        if(user.password === user.Repassword){
            let Theuser = {
                username:user.username,
                password:user.password
            }
            dispatch(EditUser(props.id, Theuser))
    
            setUser({...user, match:true, username:'',password:'',Repassword:''})
        }else{
            setUser({...user, match:false, username:'',password:'',Repassword:''})
        }

    }



    return(
        <form className="userForm">
            <div className="formDiv">
                <input type="text" onChange={changeUser} name="username" value={user.username} placeholder="username"/>
            </div>
            <div className="formDiv">
                <input type="text" onChange={changeUser} name="password" value={user.password} placeholder="password"/>
            </div>
            <div className="formDiv">
                <input type="text" onChange={changeUser} name="Repassword" value={user.Repassword} placeholder="re-enter the password"/> 
            </div>
                {!user.match?  <b>The passwords do not match please re-enter password</b> : <></> }
            <button id ="formSubmit" onClick={(e)=>submitUser(e)}>Edit Profile</button>
        </form>
    )

}

export default UserEdit