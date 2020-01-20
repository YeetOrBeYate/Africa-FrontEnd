

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
        case 'locationOpen':
            return {...state, locationOpen:true}
        case 'locationClose':
            return {...state, locationOpen:false}
        default:
            return state
    }
} 