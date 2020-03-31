import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { errorHandler } from '../utils/errorHandler';

const Pool = () => {

    const [pool, setPool] = useState({})
    const [readings, setReadings] = useState([])
    console.log(readings)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)

    // location used to extract pool id from params
    const location = useLocation()
    // history used to push to login upon errorHandler 401
    const history = useHistory()
    
    useEffect(() => {
        const len = location.pathname.length
        const poolId = location.pathname.charAt(len - 1)
        
        axiosWithAuth()
            .get(`pools/${poolId}`)
            .then(res => {

                if (res.data.is_salt_water === 1) {
                    res.data.is_salt_water = 'salt';
                } else {
                    res.data.is_salt_water = 'chlorine';
                }

                setPool(res.data)
            })
            .catch(err => {
                console.log(err.response)
                errorHandler(err.response, history)
            })
        
        axiosWithAuth()
            .get(`${process.env.REACT_APP_DB_URL}/readings/all/${user.id}`)
            .then(res => {

                res.data.map((el, i) => {
                    el.created_at = new Date(el.created_at)
                })

                console.log(res.data)
                
                // sort readings by date in descending order
                let sortedReadings = res.data.sort((a, b) => {
                    return b.id - a.id
                })
                
                setReadings(sortedReadings)
            })
            .catch(err => {
                errorHandler(err.response, history)
            })

    }, [location.pathname])

    return (
        <div className='Pool'>
            <h3>Pool Info:</h3>
            {Object.keys(pool).length !== 0 ? (
                <div className='pool-container'>
                    <h3>{pool.title}</h3>
                    <p>{pool.gallonage.toLocaleString()} gallons</p>
                    <p>Sanatizer: {pool.is_salt_water}</p>
                </div>
            ) : null}

            <h3>Readings:</h3>
            {readings.length ? (
                readings.map((el, i) => (
                    <div className='reading'>
                        <Link to={`${location.pathname}/reading/${el.id}`}>{months[el.created_at.getMonth()]}-{el.created_at.getDate()}-{el.created_at.getFullYear()}</Link>
                    </div>
                ))
            ): null}

            <Link to={`${location.pathname}/new-reading`}>Add Reading</Link>
        </div>
    );
};

export default Pool;