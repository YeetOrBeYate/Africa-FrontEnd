

const initalState = {
    itemOpen:false,
    locationOpen:false,
    profileOpen:false
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
        case 'profileOpen':
            return {...state, profileOpen:true}
        case 'profileClose':
            return {...state, profileOpen:false}
        case 'clear':
            return {...state, itemOpen:false, locationOpen:false, profileOpen:false}
        default:
            return state
    }
} 