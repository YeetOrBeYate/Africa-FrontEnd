
const initialState = {
    items:null,
    loading:false
}

export const ItemReducer = (state= initialState, action)=>{
    switch(action.type){
        case 'Itemloading':
            return {...state, loading:true}
        case 'Itemgot':
            return{...state, items:action.payload}
        default:
            return state
    }
}