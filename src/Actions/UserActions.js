
import {AxiosWithAuth} from "../comp/AddItem";

const Useredit = (data)=>{
    return{type:"Useredit", payload: data}
}

const UserLoading = ()=>{
    return {type: 'Userloading'}
}

export const EditUser=(id,user)=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().put(`https://africa-marketplace.herokuapp.com/users/${id}`,user)

        .then(res=>{
            console.log(res)
            dispatch(Useredit(user.username))
            let yeet = localStorage.getItem('user')
            yeet = JSON.parse(yeet)
            yeet = {...yeet, username:user.username}
            yeet = JSON.stringify(yeet)
            localStorage.setItem('user', yeet)
            
        })

        .catch(err=>{
            console.log(err)
        })

        

    }
}