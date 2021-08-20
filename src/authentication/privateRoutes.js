import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';

//get component from the props and pass the rest as props to the component
export default function PrivateRoutes({ component: Component, ...rest }){
    const { currentUser } = useAuth();

    return(
        <Route {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/about" />
        }}>
        </Route>
    );
}