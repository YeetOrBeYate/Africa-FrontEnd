

const initalState = {
    itemOpen:false,
    locationOpen:false
}

export const MenuReducer = (state=initalState, action)=>{
    switch(action.type){
        case "itemOpen":
            return {...state, itemOpen:true}
        case "itemClose":
            return {...state, itemOpen:false}
        default:
            return state
    }
} 