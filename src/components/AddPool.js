import React, { useState } from 'react';
import axios from 'axios';

const AddPool = () => {

    const [pool, setPool] = useState({
        user_id: JSON.parse(localStorage.getItem('user')).id,
        title: '',
        gallonage: '',
        is_salt_water: ''
    })

    const [galModal, setGalModal] = useState({
        // need to create a modal ot calulate and pass gallongae
    })

    const handleChange = e => {
        setPool({
            ...pool,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        // changes form input value to bool
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

    const handleGallonage = e => {
        e.preventDefault();

        console.log(e);
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className='add-pool-container'
        >   
            <label for='title'>Title:</label>
            <input
                type='text'
                name='title'
                onChange={handleChange}
            />
            <label for='gallonage'>Gallonage:</label>
            <button onClick={event => handleGallonage(event)}>Calculate</button>
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