


const initialState = {
    navForward:false,
    success:false,
    failure:false,
    loading:false,
    message:null,
    code:null
}

export const RegisterReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'loading':
            return {...state, loading:true}
        case 'good':
            return {...state, loading:false, success: true, navForward:true}
        case 'bad':
            return {...state, loading:false, failure: true}
        case 'duplicate':
            return {...state, loading:false, failure: true, message:action.payload.message, code:action.payload.code}
        case 'moved':
            return {...state, navForward:false}
        case 'fixed':
            return{...state, failure:false, navForward:false, success:false,loading:false, message:null, code:null}
        default:
            return state
    }
}