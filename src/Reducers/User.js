

const checkToken=()=>{
    let token =localStorage.getItem('token')
    if(token !==''){
        return token
    }else{
        return token = ''
    }
}

const checkUser = ()=>{
    let user = localStorage.getItem('user')
    if(user !== null){
        return user = JSON.parse(user)
    }else{
        return user = null
    }
}
const initialState = {
    loading:false,
    user:checkUser(),
    token:checkToken(),
    itemEdit:false,
    locationEdit:false
}

// user{
//     id:
//     username:
//     locations:
//     items:
// }

export const UserReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'Userloading':
            return{...state, loading:true}
        case 'userGood':
            return{...state, loading:false, user:action.payload, token:action.token}
        case 'Useredit':
            return{...state, user: {...state.user, username:action.payload}}
        case "UserEdititem":
            return{...state, itemEdit:true, loading:false}
        case "ItemCloseedit":
            return{...state, itemEdit:false, user:{...state.user, items: action.payload}}
        case 'UserEditlocation':
            return{...state, locationEdit:true, loading:false}
        case 'LocationCloseedit':
            return{...state, locationEdit:false, user:{...state.user, locations:action.payload}}
        case 'UserAddItem':
            return{...state, user:{...state.user, items:[...state.user.items,action.payload]}, loading:false}
        case 'UserAddLocation':
            return{...state, user:{...state.user, locations:[...state.user.locations, action.payload]}, loading:false}
        case 'UserDeleteItem':
            return{...state,user:{...state.user,items:state.user.items.filter(item=>item.id !=action.payload)}, loading:false}
        default:
            return state
    }
        
}