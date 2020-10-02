import { navigate } from '@reach/router'
import axios from 'axios'
import { api } from '../api'


const authAxios = axios.create()

// Our own instance of axios which will always be authenticated
authAxios.interceptors.request.use(config => {
    const newConfig = config
    const token = localStorage.getItem("token")
    newConfig.headers = {
        "Authorization": `Token ${token}`
    }
    return newConfig
})

function isAuthenticated() {
    const token = localStorage.getItem("token")
    return token !== null && token !== undefined
}

function login(username, password) {
    return axios.post(api.auth.login, {
        username, password
    })
    .then(res => {
        localStorage.setItem("token", res.data.key)
        navigate("/")
        return res
    })
}

function signup(username, email, password1, password2) {
    return axios.post(api.auth.register, {
        username, email, password1, password2
    })
    .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.key)
        navigate('/')
        return res
    })
}

function logout() {
    localStorage.removeItem("token");
}

const authenticationService = {
    isAuthenticated: isAuthenticated(),
    logout,
    login,
    signup,
}

export { authAxios, authenticationService }