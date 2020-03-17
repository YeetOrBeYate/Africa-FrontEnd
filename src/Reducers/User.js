

const checkToken=()=>{
    let token =localStorage.getItem('token')
    if(token !==''){
        return token
    }else{
        return token = ''
    }
}

const checkUser = ()=>{
    let userid = localStorage.getItem('userId')
    if(userid !== null){
        return userid = JSON.parse(userid)
    }else{
        return userid = null
    }
}
const initialState = {
    loading:false,
    userid:checkUser(),
    user:null,
    locationEdit:false
}

// user{
//     id:
//     username:
//     locations:
// }

export const UserReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'Userloading':
            return{...state, loading:true}
        case "userId":
            return{...state, userid:action.payload}
        case 'userGood':
            return{...state, loading:false, user:action.payload,}
        case 'Useredit':
            return{...state, user: {...state.user, username:action.payload}}
        case 'UserEditlocation':
            return{...state, locationEdit:true, loading:false}
        case 'LocationCloseedit':
            return{...state, locationEdit:false, user:{...state.user, locations:action.payload}}
        case 'UserAddLocation':
            return{...state, user:{...state.user, locations:[...state.user.locations, action.payload]}, loading:false}
        case 'UserDeleteItem':
            return{...state,user:{...state.user,items:state.user.items.filter(item=>item.id !=action.payload)}, loading:false}
        case 'UserDeleteLocation':
            return {...state,user:{...state.user, locations:state.user.locations.filter(loc=>loc.id !=action.payload)}, loading:false}
        case 'clearUser':
            return{...state, user:null}
        default:
            return state
    }
        
}