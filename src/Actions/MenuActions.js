

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

const Profileopen = ()=>{
    return {type:'profileOpen'}
}

const Profileclose = ()=>{
    return {type:'profileClose'}
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

export const openProfile = ()=>{
    return function(dispatch){
        dispatch(Profileopen())
    }
}

export const closeProfile = ()=>{
    return function(dispatch){
        dispatch(Profileclose())
    }
}