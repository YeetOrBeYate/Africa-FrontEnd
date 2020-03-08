
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

const UserEditItem = ()=>{
    return{type:'UserEdititem'}
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

const UserAddItem=(data)=>{
    return{type:'UserAddItem', payload:data}
}

const UserAddLocation =(data)=>{
    return{type:'UserAddLocation', payload:data}
}

const UserDeleteItem =data=>{
    return{type: 'UserDeleteItem', payload:data}
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

export const EditUserItem = (id, item)=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().put(`/item/${id}`,item)
        .then(res=>{
            console.log("edituseritem",res)
            dispatch(UserEditItem())
        })

        .catch(err=>{
            console.log(err)
        })

    }
}

export const CloseEditUserItem = (list)=>{

    return function(dispatch){

        dispatch(CloseUserEditItem(list))

        let yeet = localStorage.getItem('user')
        yeet = JSON.parse(yeet)
        yeet = {...yeet, items:list}
        yeet = JSON.stringify(yeet)
        localStorage.setItem('user', yeet)
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

        let yeet = localStorage.getItem('user')
        yeet = JSON.parse(yeet)
        yeet = {...yeet, locations:list}
        yeet = JSON.stringify(yeet)
        localStorage.setItem('user', yeet)
    }
}

export const AddItem = (item)=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().post(`/item`, item)
        .then(res=>{
            console.log("add item", res)

            item = {...item, id:res.data.id}

            dispatch(UserAddItem(item))

            let yeet = localStorage.getItem('user');
            yeet = JSON.parse(yeet);
            yeet = {...yeet, items:[...yeet.items, item]}
            yeet = JSON.stringify(yeet)
            localStorage.setItem('user', yeet);
        })
        .catch(err=>{
            console.log(err)
        })
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

            let yeet = localStorage.getItem('user')
            yeet = JSON.parse(yeet);
            yeet = {...yeet, locations:[...yeet.locations, location]}
            yeet = JSON.stringify(yeet);
            localStorage.setItem('user', yeet);

        })

        .catch(err=>{
            console.log(err)
        })
    }


}

export const RemoveItem = (itemid)=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().delete(`/item/${itemid}`)
        .then(res=>{
            console.log('delete Item', res)
            dispatch(UserDeleteItem(itemid))

            let yeet = localStorage.getItem('user')
            yeet = JSON.parse(yeet)
            yeet = {...yeet, items:yeet.items.filter(item=>item.id !=itemid)}
            yeet = JSON.stringify(yeet)
            localStorage.setItem('user', yeet)
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

            let yeet = localStorage.getItem('user')
            yeet = JSON.parse(yeet)
            yeet = {...yeet, locations: yeet.locations.filter(loc=>loc.id != locationid)}
            yeet = JSON.stringify(yeet)
            localStorage.setItem('user', yeet)
        })

        .catch(err=>{
            console.log(err)
        })
    }
}