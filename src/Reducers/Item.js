
const initialState = {
    items:null,
    loading:false
}

export const ItemReducer = (state= initialState, action)=>{
    switch(action.type){
        case 'Itemloading':
            return {...state, loading:true}
        case 'Itemgot':
            return{...state, loading:false, items:action.payload}
        case 'Itemedit':
            console.log('THE ID', action.put)
            return{...state, loading:false, items: state.items.map((item)=>
                {if(item.id == action.put){
                  item.name = action.payload.name
                  item.description = action.payload.description
                  item.price = action.payload.price
                  item.user_id = action.payload.user_id
                  item.category_id = action.payload.category_id
                  return item
                }else{
                  return item
                }}
                )}
        case 'Itemadd':
            return {...state, loading:false, items: [...state.items, action.payload]}
        case 'Itemdelete':
            return {...state, loading:false, items: state.items.filter(item=> item.id !=action.payload)}
        default:
            return state
    }
}