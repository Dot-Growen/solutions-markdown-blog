import React, { useContext, useState } from 'react';
import { Container } from 'semantic-ui-react'
import { Button, Card, Form, Input } from 'antd';
import { navigate } from "@reach/router"
import Message from '../components/Message';
import { authenticationService } from '../services'
import AuthContext from '../context/AuthContext';
import { UserOutlined, MailOutlined, LockOutlined, CheckCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, } from '@ant-design/icons';
import PostList from './PostList';



const Signup = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { auth, setAuth } = useContext(AuthContext);

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        authenticationService.signup(username, email, password, confirmPassword)
            .then(res => {
                localStorage.setItem("token", res.data.key)
                setLoading(false);
                setAuth(true)
                navigate('/')
            })
            .catch(error => {
                setLoading(false)
                setError("All fields are required" || error)
            })
    }

    if (auth) {
        navigate('/')
        return <PostList path='/'/>
    }

    return (
        <Container>
            <Card bordered={false} className="join" hoverable >
                <h2 className="create-title">Signup for an account</h2>
                {error && (
                    <Message color='red' message={error} />
                )}
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <label className="create-label text-white">Username</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <label className="create-label text-white">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            prefix={<MailOutlined />}
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <label className="create-label text-white">Password</label>
                        <Input.Password
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            prefix={<LockOutlined />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            }
                        ]}
                    >
                        <label className="create-label text-white">Confirm Password</label>
                        <Input.Password
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            prefix={<CheckCircleOutlined />}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading} 
                    disabled={loading} 
                    onClick={handleSubmit}
                    block>Signup</Button>
                </Form>
            </Card>
        </Container>
    );
}

export default Signup;
