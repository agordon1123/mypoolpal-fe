import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { errorHandler } from '../utils/errorHandler'

const Reading = props => {

    const location = useLocation()

    const [reading, setReading] = useState({})
    console.log(reading)

    useEffect(() => {
        // I need to impliment redux to save from all of these API calls
        // or move the API calls a level up to Dashboard.js

        const len = location.pathname.length
        const readingId = location.pathname.charAt(len - 1)

        axiosWithAuth()
            .get(`${process.env.REACT_APP_DB_URL}/readings/${readingId}`)
            .then(res => {
                setReading(res.data)
            })
            .catch(err => {
                console.log(err)
                errorHandler(err.response)
            })
    }, [])
    
    console.log(props);

    return (
        <div className='reading'>
            <p>READING</p>
            {Object.keys(reading).length !== 0 ?(
                <>
                    <p>pH: {reading.pH}</p>
                    <p>Chlroine: {reading.chlorine}</p>
                    <p>Alkalinity: {reading.alkalinity}</p>
                    <p>Salinity: {reading.salinity}</p>
                </>
            ) : null}
        </div>
    )
}

export default Reading