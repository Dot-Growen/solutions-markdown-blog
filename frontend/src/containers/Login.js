import React, { useContext, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Card, Button, Input, Form } from 'antd'
import { Link, navigate } from '@reach/router'
import Message from '../components/Message'
import { authenticationService } from '../services'
import AuthContext from '../context/AuthContext'
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    UserOutlined
} from '@ant-design/icons'
import PostList from './PostList'

const Login = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { auth, setAuth } = useContext(AuthContext)

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault()
        authenticationService
            .login(username, password)
            .then(res => {
                localStorage.setItem('token', res.data.key)
                setLoading(false)
                setAuth(true)
                navigate('/')
            })
            .catch(error => {
                setLoading(false)
                setError('Invalid credentials, please try again.' || error)
            })
    }

    if (auth) {
        navigate('/')
        return <PostList path='/'/>
    }

    return (
        <Container>
            <Card bordered={false} className='join' hoverable>
                <h2 className='create-title'>Login to your account</h2>
                {error && <Message color='red' message={error} />}
                <Form
                    name='basic'
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]}
                    >
                        <label className='create-label text-white'>Username</label>
                        <Input
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            prefix={<UserOutlined />}
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
                        <label className='create-label text-white'>Password</label>
                        <Input.Password
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            prefix={<LockOutlined />}
                            iconRender={visible =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            onClick={handleSubmit}
                            loading={loading}
                            disabled={loading}
                            block
                        >
                            Login
                        </Button>
                    </Form.Item>
                    <Link to={'/signup'}>Signup now!</Link>
                </Form>
            </Card>
        </Container>
    )
}

export default Login
