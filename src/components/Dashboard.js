import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import WeatherWidget from './WeatherWidget';
import Paper from '@material-ui/core/Paper';
import PoolIcon from '@material-ui/icons/Pool';
import { errorHandler } from '../utils/errorHandler';

const Dashboard = props => {
    const { pools, setPools, readings, setReadings } = props;
    const user = JSON.parse(localStorage.getItem('user'))
    const history = useHistory();
    
    useEffect(() => {
        axiosWithAuth()
            .get(`pools/all/${user.id}`)
            .then(res => {
                setPools(res.data)
            })
            .catch(err => {
                errorHandler(err.response, history)
            })

            axiosWithAuth()
            .get(`${process.env.REACT_APP_DB_URL}/readings/all/${user.id}`)
            .then(res => {
                // create new date object from timestamp
                res.data.map((el, i) => {
                    el.created_at = new Date(el.created_at)
                })

                console.log(res.data)
                // TODO: Filter out by pool ->
                // will require adding pool as foreign key in reading table
                // will require pool object to be passed in from this view
                // and also prompt a select in the add reading view to
                // select pool
                // once in place -> filter
                
                // sort readings by date in descending order
                let sortedReadings = res.data.sort((a, b) => {
                    return b.id - a.id
                })
                setReadings(sortedReadings)
            })
            .catch(err => {
                errorHandler(err.response, history)
            })
    }, [user.id])

    return (
        <div className='dashboard-container'>
            <h1>Welcome, {user.first_name}!</h1>
            <WeatherWidget />
            <h3>Pools:</h3>
            {pools.length ? pools.map((el, i) => (
                <div key={i} className='pool-links-container'>
                    <Link to={`pool/${el.id}`}>
                        <Paper elevation={3} className='pool-link-container'>
                        <PoolIcon />
                            <div className='pool-link-info-container'>
                                <p>{el.title}</p>
                                {/* TODO: obtain and pass in last reading */}
                                <p>last reading: 4/13/20*</p>
                            </div>
                        </Paper>
                    </Link>
                </div>
            )) : null}
            <Link to='new-pool' className='add-new-pool'>+ Add Pool</Link>
        </div>
    );
};

export default Dashboard;