import axios from 'axios';

export const loading = ()=>{
    return {type: 'Loginloading'}
}

export const good = ()=>{
    return {type: 'good' }
}

export const bad = ()=>{
    return { type: 'bad'}
}

export const forward = ()=>{
    return {type:'moved'}
}

export const fixFailure = ()=>{
    return {type:'resetLogin'}
}

//this fucntion sets the user id in the user reducer, dont remove the case for the user reducer that corrisponds
export const UserId = (data)=>{
    return {type:'userId', payload:data}
}


export const stopMove = ()=>{

    return function(dispatch){

        dispatch(forward())
    }
}

export const signIn = (person)=>{

    return function(dispatch){

        dispatch(loading());
        //removed the userloading action from this location
        return axios.post('https://africa-marketplace.herokuapp.com/auth/login', person)
        .then(res=>{

            // console.log(res)
            // console.log(person)

            const token = res.data.token;
            let userid = res.data.id;

            
            userid = JSON.stringify(userid)

            localStorage.setItem('token',token)
            localStorage.setItem('userId', userid)

            dispatch(good())
            dispatch(UserId(userid))
        })
        .catch(err=>{
            console.log('bad',err)
            dispatch(bad())
        })

    }
}

export const FixFailure = ()=>{
    return function(dispatch){

        dispatch(fixFailure())
    }
}