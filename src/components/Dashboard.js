import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Dashboard = () => {

    const [pools, setPool] = useState([])

    // const user = JSON.parse(localStorage.getItem('user'))
    
    // useEffect(() => {
    //     axiosWithAuth
    //         .get(`/all/${user.id}`)
    //         .then(res => {
    //             console.log(res)
    //             // setPools(res)
    //         })
    //         .catch(err => {
    //             alert(err)
    //         })
    // }, [])

    return (
        <div>
            <h1>DASHBOARD</h1>
            {/* <h1>Welcome, {user.first_name}!</h1> */}
            <Link to='new-pool'>Add Pool</Link>
        </div>
    );
};

export default Dashboard;