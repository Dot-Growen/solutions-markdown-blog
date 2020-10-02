import React, { useContext } from 'react';
import Login from '../containers/Login';
import AuthContext from '../context/AuthContext';
import { authenticationService } from '../services';

const PrivateRoute = (props) => {

    const { user } = useContext(AuthContext);

    let { as: Comp, ...rest } = props;
    return user ? <Comp {...rest} /> : <Login />;
}


export default PrivateRoute;
