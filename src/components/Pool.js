import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { errorHandler } from '../utils/errorHandler';

const Pool = () => {

    const [pool, setPool] = useState({})
    const [readings, setReadings] = useState([])

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
        
    //     axiosWithAuth()
    //         .get(`/readings/${user.id}`)
    //         .then(res => {
    //             console.log(res.data)
    //         })
    //         .catch(err => {
    //             // currently receiving an error
    //             console.log(err.response)
    //             errorHandler(err.response, history)
    //         })

    }, [location.pathname])

    return (
        <div className='Pool'>
            {Object.keys(pool).length !== 0 ? (
                <div className='pool-container'>
                    <h3>{pool.title}</h3>
                    <p>{pool.gallonage} gallons</p>
                    <p>Sanatizer: {pool.is_salt_water}</p>
                </div>
            ) : null}
            <Link to={`${location.pathname}/new-reading`}>Add Reading</Link>
        </div>
    );
};

export default Pool;