
import {AxiosWithAuth} from "../comp/AddItem";

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
            console.log("from the load user",user)
            dispatch(UserGood(user))
        })

        .catch(err=>{
            console.log('loaduser', err)

            
        })

    }
}

export const EditUser=(id,user)=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().put(`/users/${id}`,user)

        .then(res=>{
            console.log("editUser",res)
            dispatch(Useredit(user.username))

            
        })

        .catch(err=>{
            console.log("editUser",err)
            dispatch(UserFailure())
        })

        

    }
}


export const EditUserLocation = (id,location)=>{

    return function(dispatch){
        dispatch(UserLoading())

        AxiosWithAuth().put(`/location/${id}`, location)
        .then(res=>{
            console.log(res)
            dispatch(UserEditLocation(id,location))
        })

        .catch(err=>{
            console.log("EditUserLocation",err)
            dispatch(UserFailure())
        })
    }
}


export const AddLocation = (location)=>{
    
    return function(dispatch){
        dispatch(UserLoading())

        AxiosWithAuth().post(`/location`,location)
        .then(res=>{
            console.log("adding location", res)
        
            location = {...location, id:res.data.id}
            dispatch(UserAddLocation(location))

        })

        .catch(err=>{
            console.log("Addlocation", err)

            dispatch(UserFailure())
        })
    }


}

export const RemoveLocation = (locationid)=>{

    return function(dispatch){

        dispatch(UserLoading())
        
        return AxiosWithAuth().delete(`/location/${locationid}`)
        
        .then(res=>{
            console.log('deleting location', res)
            dispatch(UserDeleteLocation(locationid))


        })

        .catch(err=>{
            console.log("delete location", err)
            dispatch(UserFailure())
        })
    }
}