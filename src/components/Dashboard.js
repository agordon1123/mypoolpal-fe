import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Dashboard = () => {

    const [pools, setPools] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))
    
    useEffect(() => {
        axiosWithAuth()
            .get(`pools/all/${user.id}`)
            .then(res => {
                setPools(res.data)
            })
            .catch(err => {
                console.log(err)
                alert('There was an error processing your request')
            })
    }, [user.id])

    return (
        <div className='Dashboard'>
            <h1>Welcome, {user.first_name}!</h1>
            <h3>Your pools:</h3>
            {pools.length ? pools.map((el, i) => (
                <div key={i} className='pool-link-container'>
                    <Link to={`pool/${el.id}`}>{el.title}</Link>
                </div>
            )) : null}
            <Link to='new-pool'>Add Pool</Link>
        </div>
    );
};

export default Dashboard;