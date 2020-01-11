 
 
 
 const initialState = {

     loading:false,
     categories: null,
     failure:false
 }

 export const CategoryReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'Catloading':
            return {...state, loading:true}
        case 'Catgood':
            return{...state, loading:false, categories:action.payload}
        case 'Catbad':
            return{...state, failure:true, loading:false}
        default:
            return state
    }
}