import React, { useState } from 'react';
import axios from 'axios';

const AddPool = () => {

    const [pool, setPool] = useState({
        user_id: JSON.parse(localStorage.getItem('user')).id,
        title: '',
        gallonage: '',
        is_salt_water: ''
    })

    const handleChange = e => {
        setPool({
            ...pool,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (pool.is_salt_water === 'salt') {
            setPool({
                ...pool,
                is_salt_water: true
            })
        } else {
            setPool({
                ...pool,
                is_salt_water: false
            })
        }

        axios
            .post(`${process.env.REACT_APP_DB_URL}/pools`, pool)
            .then(pool => {
                console.log(pool);
            })
            .catch(err => console.log(err))
    }

    return (
        <form 
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                name='title'
                onChange={handleChange}
            />
            <input
                type='text'
                name='gallonage'
                onChange={handleChange}
            />
            <label for='sanitizer'>Sanitizer:</label>
            <select
                id='sanitizer'
                name='is_salt_water'
                onChange={handleChange}
            >
                <option
                    value='chlorine'
                >Chlorine</option>
                <option
                    value='salt'
                >Salt</option>
            </select>
            <button
                type='submit'
            >Go</button>
        </form>
    );
};

export default AddPool;