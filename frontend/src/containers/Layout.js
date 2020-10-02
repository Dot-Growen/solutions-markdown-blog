import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext';
import { authenticationService } from '../services';
import { navigate } from '@reach/router';

const Layout = ({ children }) => {

    const { auth, setAuth } = useContext(AuthContext);
    console.log("auth => " + auth)
    
    const logout = () => {
        setAuth(false)
        navigate('/')
        console.log("layout auth => ", authenticationService.isAuthenticated)
    }

    return (
        <>
            <Navbar className="nav-bar" isLoggedIn={auth} logout={logout} />
            <Container text className="main-container">
                {children}
            </Container>
        </>
    );
}

export default Layout;
