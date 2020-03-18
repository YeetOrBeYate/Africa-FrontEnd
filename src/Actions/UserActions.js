
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


const CloseUserEditItem=(data)=>{
    return{type:"ItemCloseedit", payload:data}
}

const UserEditLocation = ()=>{
    return{type:'UserEditlocation'}
}

const CloseUserEditLocation = (data)=>{
    return{type:'LocationCloseedit', payload:data}
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
            console.log(err)
        })

        

    }
}

export const CloseEditUserItem = (list)=>{

    return function(dispatch){

        dispatch(CloseUserEditItem(list))


    }
}

export const EditUserLocation = (id,location)=>{

    return function(dispatch){
        dispatch(UserLoading())

        AxiosWithAuth().put(`/location/${id}`, location)
        .then(res=>{
            console.log(res)
            dispatch(UserEditLocation())
        })

        .catch(err=>{
            console.log(err)
        })
    }
}

export const CloseEditUserLocation = (list)=>{

    return function(dispatch){

        dispatch(CloseUserEditLocation(list))


    }
}

export const AddLocation = (location)=>{
    
    return function(dispatch){
        dispatch(UserLoading())

        AxiosWithAuth().post(`/location`, location)
        .then(res=>{
            console.log("adding location", res)
        
            location = {...location, id:res.data.id}
            dispatch(UserAddLocation(location))

        })

        .catch(err=>{
            console.log(err)
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
            console.log(err)
        })
    }
}