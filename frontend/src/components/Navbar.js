import React, { useState } from 'react'
import { Link } from '@reach/router'
import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { authenticationService } from '../services';

const Navbar = (props) => {

    const [current, setCurrent] = useState("mail");

    const { isLoggedIn, logout } = props

    const handleClick = e => {
        console.log('click ', e);
        setCurrent( e.key );
    };

    return (
        <Menu theme="dark" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="mail" icon={<HomeOutlined />}>
                <Link to={'/'}>Solutions</Link>
            </Menu.Item>
            {isLoggedIn && <Menu.Item key="create">
                <Link to={'/create'}>Create a post</Link>
            </Menu.Item>}
            {isLoggedIn && <Menu.Item key="logout" onClick={() => {
                return (
                    authenticationService.logout(),
                    logout(),
                    console.log(authenticationService.isAuthenticated)
                )
            }} >
                Logout
            </Menu.Item>}
            {!isLoggedIn && <Menu.Item key="login" >
                <Link to={'/login'}>Login</Link>
            </Menu.Item>}
            {!isLoggedIn && <Menu.Item key="signup" >
                <Link to={'/signup'}>Signup</Link>
            </Menu.Item>}
        </Menu>
    );
}

export default Navbar

