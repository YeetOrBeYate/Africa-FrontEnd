

const Itemopen = ()=>{
    return{type:"itemOpen"}
}

const Itemclose = ()=>{
    return{type:"itemClose"}
}

const Locationopen = ()=>{
    return{type: 'locationOpen'}
}

const Locationclose = ()=>{
    return{type: 'locationClose'}
}


export const openItems = ()=>{

    return function(dispatch){

        dispatch(Itemopen())

    }
}

export const closeItems = ()=>{
    
    return function(dispatch){

        dispatch(Itemclose())
    }
}

export const openLocations = ()=>{
    return function(dispatch){
        dispatch(Locationopen())
    }
}

export const closeLocations = ()=>{
    return function(dispatch){
        dispatch(Locationclose())
    }
}