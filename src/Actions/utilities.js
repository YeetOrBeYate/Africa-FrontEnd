import axios from 'axios'

export function invalidToken(message,code){
    return {type: 'invalidToken', payload:{message,code}}
}

export const AxiosWithAuth =()=>{
    return axios.create({
        baseURL:'https://africa-marketplace.herokuapp.com',
        headers:{
            authorization: localStorage.getItem('token')
        }
    })
}