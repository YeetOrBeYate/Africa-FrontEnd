
import {AxiosWithAuth} from "../comp/AddItem";


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

export const EditUser=(id,user)=>{

    return function(dispatch){

        dispatch(UserLoading())

        return AxiosWithAuth().put(`https://africa-marketplace.herokuapp.com/users/${id}`,user)

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

        return AxiosWithAuth().put(`https://africa-marketplace.herokuapp.com/item/${id}`,item)
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

        AxiosWithAuth().put(`https://africa-marketplace.herokuapp.com/location/${id}`, location)
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

        return AxiosWithAuth().post(`https://africa-marketplace.herokuapp.com/item`, item)
        .then(res=>{
            console.log(res)
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

        AxiosWithAuth().post(`https://africa-marketplace.herokuapp.com/location`, location)
        .then(res=>{
            console.log(res)
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

        dispatch(UserDeleteItem(itemid))
        // return AxiosWithAuth().delete(`https://africa-marketplace.herokuapp.com/item/${itemid}`)
        // .then(res=>{

        // })

        // .catch(err=>{
        //     console.log(err)
        // })
    }
}