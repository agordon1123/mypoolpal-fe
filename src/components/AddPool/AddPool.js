import React, { useState } from 'react';
import CalculateGallonage from './CalculateGallonage';
import axios from 'axios';

const AddPool = () => {

    const [pool, setPool] = useState({
        user_id: JSON.parse(localStorage.getItem('user')).id,
        title: '',
        gallonage: '',
        is_salt_water: ''
    })

    const [modal, setModal] = useState({ show: false })

    const handleChange = e => {
        setPool({
            ...pool,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (pool.gallonage === 0) {
            return alert('Pool cannot have gallonage of 0')
        }
        
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

    const handleClose = () => {
        setModal({ show: false })
    }

    const handleCalculate = gallonage => {
        setPool({
            ...pool,
            gallonage: gallonage
        })
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
            <button type='button' onClick={() => setModal({ show: true })}>Calculate</button>
            <CalculateGallonage 
                show={modal.show} 
                handleClose={handleClose} 
                handleCalculate={handleCalculate}
            />
            <input
                type='text'
                name='gallonage'
                value={pool.gallonage}
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
            <button type='submit'>Go</button>
        </form>
    );
};

export default AddPool;