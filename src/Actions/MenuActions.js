

const Itemopen = ()=>{
    return{type:"itemOpen"}
}

const Itemclose = ()=>{
    return{type:"itemClose"}
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