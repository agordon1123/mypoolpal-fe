import axios from 'axios'

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token')
    return axios.create({
        baseURL: process.env.REACT_APP_DB_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    })
}
