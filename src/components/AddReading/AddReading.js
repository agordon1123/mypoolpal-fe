import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const AddReading = () => {

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

        console.log(reading)

        return alert("submitted")

        axiosWithAuth()
            .get()
            .then()
            .catch()
    }


    return (
        <form onSubmit={handleSubmit} className='AddReading'>
            <label for='pH'>pH:</label>
            <input 
                type='text'
                name='pH' 
                onChange={handleChange} 
            />

            <label for='chlorine'>Chlorine:</label>
            <input 
                type='text'
                name='chlorine' 
                onChange={handleChange} 
            />

            <label for='alkalinity'>Alkalinity:</label>
            <input
                type='text'
                name='alkalinity'
                onChange={handleChange}
            />

            <label for='salinity'>Salinity:</label>
            <input
                type='text'
                name='salinity'
                onChange={handleChange}
            />

            <button type='submit'>Go</button>
        </form>
    );
};

export default AddReading;