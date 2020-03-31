import axios from 'axios'

const token = localStorage.getItem('token')

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_DB_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    })
}
