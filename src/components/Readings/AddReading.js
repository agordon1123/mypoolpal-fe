import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { errorHandler } from '../../utils/errorHandler';

const AddReading = () => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const [reading, setReading] = useState({
        user_id: user.id,
        pH: '',
        chlorine: '',
        alkalinity: '',
        salinity: ''
    })

    const handleChange = e => {
        setReading({
            ...reading,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axiosWithAuth()
            .post(`${process.env.REACT_APP_DB_URL}/readings`, reading)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response)
                errorHandler(err.response, history)
            })
    }


    return (
        <form onSubmit={handleSubmit} className='AddReading'>
            <label for='pH'>pH:</label>
            <input 
                type='number'
                step='0.1'
                name='pH' 
                onChange={handleChange} 
            />

            <label for='chlorine'>Chlorine:</label>
            <input 
                type='number'
                step='0.1'
                name='chlorine' 
                onChange={handleChange} 
            />

            <label for='alkalinity'>Alkalinity:</label>
            <input
                type='number'
                step='10'
                name='alkalinity'
                onChange={handleChange}
            />

            <label for='salinity'>Salinity:</label>
            <input
                type='number'
                step='10'
                name='salinity'
                onChange={handleChange}
            />

            <button type='submit'>Go</button>
        </form>
    );
};

export default AddReading;