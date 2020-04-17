
import {AxiosWithAuth} from "../comp/AddItem";
import {invalidToken} from "./utilities";

const UserGood = (data, token)=>{
    return {type:'userGood', payload: data}
}

const Useredit = (data)=>{
    return{type:"Useredit", payload: data}
}

const UserLoading = ()=>{
    return {type: 'Userloading'}
}

const UserEditLocation = (id, data)=>{
    return{type:'UserEditlocation', put:id, payload:data}
}


const UserAddLocation =(data)=>{
    return{type:'UserAddLocation', payload:data}
}


const UserDeleteLocation = (data)=>{
    return{type:'UserDeleteLocation', payload:data}
}

const Userclear = ()=>{
    return {type:'clearUser'}
}

const UserFailure = ()=>{
    return {type:'Userfailure'}
}

const WrongUser = (message,code)=>{
    return {type:'WrongUser', payload:{message, code}}
}

const UserFix = ()=>{
    return {type:'UserFix'}
}

const UserListGood = (data)=>{
    return {type:'userListGood', payload:data}
}

export const clearUser = ()=>{
    return function(dispatch){

        dispatch(Userclear())
    }

}

export const LoadUser=(id)=>{
    
    return function(dispatch){

        dispatch(UserLoading())
        return AxiosWithAuth().get(`/users/${id}`)

        .then(response=>{
            
            let user = response.data.user
            dispatch(UserGood(user))
        })

        .catch(err=>{
            // console.log('loaduser failure', err)
            if(err.response && err.response.status == '403'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(WrongUser(message,code))
            }else if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(UserFailure())
            }else{
                dispatch(UserFailure())
            }
        })
    }
}

export const EditUser=(id,user)=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().put(`/users/${id}`,user)

        .then(res=>{
            dispatch(Useredit(user.username))
        })
        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(UserFailure())
            }else{                
                dispatch(UserFailure())
            }
        })
    }
}


export const EditUserLocation = (id,location)=>{

    return function(dispatch){

        dispatch(UserLoading())

        AxiosWithAuth().put(`/location/${id}`, location)
        .then(res=>{
            dispatch(UserEditLocation(id,location))
        })

        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(UserFailure())
            }else{
                dispatch(UserFailure())
            }
        })
    }
}


export const AddLocation = (location)=>{
    
    return function(dispatch){
        
        dispatch(UserLoading())

        AxiosWithAuth().post(`/location`,location)
        .then(res=>{
            location = {...location, id:res.data.id}
            dispatch(UserAddLocation(location))
        })

        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(UserFailure())
            }else{
                dispatch(UserFailure())
            }
        })
    }
}

export const RemoveLocation = (locationid)=>{

    return function(dispatch){

        dispatch(UserLoading())
        
        return AxiosWithAuth().delete(`/location/${locationid}`)
        
        .then(res=>{
            dispatch(UserDeleteLocation(locationid))
        })

        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(UserFailure())
            }else{
                dispatch(UserFailure())
            }
        })
    }
}

export const LoadUsers = ()=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().get(`https://africa-marketplace.herokuapp.com/users`)
        .then(res=>{
            let users = res.data.users

            dispatch(UserListGood(users))
        })
        
        .catch(err=>{
            if(err.response && err.response.status == '401'){
                let message = err.response.data.message
                let code = err.response.status
                dispatch(invalidToken(message,code))
                dispatch(UserFailure())
            }else{                
                dispatch(UserFailure())
            }
        })
    }
}

export const FixUserFailure = ()=>{

    return function(dispatch){

        dispatch(UserFix())

    }
}