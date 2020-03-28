

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
    failure:false
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
        case 'userGood':
            return{...state, loading:false, user:action.payload,}
        case 'Useredit':
            return{...state, loading:false, user: {...state.user, username:action.payload}}
        case 'UserEditlocation':
            return{...state, loading:false, locations: state.user.locations.map((loc)=>{
                if(loc.id == action.put){
                    loc.name = action.payload.name
                    return loc
                }else{
                    return loc
                }
            })}
        case 'UserAddLocation':
            return{...state, loading:false, user:{...state.user, locations:[...state.user.locations, action.payload]}}
        case 'UserDeleteLocation':
            return {...state,loading:false, user:{...state.user, locations:state.user.locations.filter(loc=>loc.id !=action.payload)}}
        case 'clearUser':
            return{...state, user:null}
        case 'Userfailure':
            return {...state, failure:true }
        case 'UserFix':
            return {...state, failure:false}
        default:
            return state
    }
        
}