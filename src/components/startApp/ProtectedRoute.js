import React from "react";
import {Route,Redirect } from 'react-router-dom';


function ProtectedRoute ({component:Component, ...rest})
{
    return <Route
       {...rest} 
       render={(props)=>{
        if (localStorage.getItem('users')===null)
        {
            <Redirect to={{pathname: '/login' }} />
        }
        else {
            <Redirect to={{pathname: '/home' }} />

        }
    }
        
    
    }
    
    
    />;
}


export default ProtectedRoute;

/*
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={
        props => <Component {...rest} {...props} />
      } />      
    )*/