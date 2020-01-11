

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
    locatinEdit:false
}

export const UserReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'Userloading':
            return{...state, loading:true}
        case 'userGood':
            return{...state, loading:false, user:action.payload, token:action.token}
        case 'Useredit':
            return{...state, user: {...state.user, username:action.payload}}
        default:
            return state
    }
        
}