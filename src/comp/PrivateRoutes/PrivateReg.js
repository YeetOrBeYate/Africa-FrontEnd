
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateReg = ({component: Component, ...rest}) =>{
    return (
        <Route 
            {...rest}
            render={props => {
                return (localStorage.getItem('token')) 
                ?  <Redirect to='/dashboard' />
                : <Component {...props} />
            }}
        />
    )
}
export default PrivateReg