import { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { authAxios } from '../services';
import AuthContext from '../context/AuthContext';

function useFetch(url, initialState=null) {
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        console.log("but")
        async function fetchData() {
            setLoading(true)
            try {
                let ax = axios
                if(auth){
                    ax = authAxios
                } 
                const res = await ax.get(url)
                setData(res.data)
                setLoading(false)
            } catch (error) {
                console.log("eerrrrror => " + error)
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, []);

    return {
        data, 
        loading,
        error
    }
}

export {useFetch}