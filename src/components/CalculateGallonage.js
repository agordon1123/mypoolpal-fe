import React, { useState } from 'react';
import { calculateGallonage } from '../functions/calculateGallonage';

const CalculateGallonage = () => {

    const [measurements, setMeasurements] = useState({
        length: 0,
        width: 0,
        depth: 0
    })

    const handleChange = e => {
        setMeasurements({
            ...measurements,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        alert(calculateGallonage(measurements));
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                name='length'
                onChange={handleChange}
            />
            <input
                type='text'
                name='width'
                onChange={handleChange}
            />
            <input
                type='text'
                name='depth'
                onChange={handleChange}
            />
            <button
                type='submit'
            >GO</button>
        </form>
    );
};

export default CalculateGallonage;