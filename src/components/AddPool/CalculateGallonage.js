import React, { useState } from 'react';
import { gallonageCalculator } from '../../functions/gallonageCalculator';
import InputGallonageForm from './InputGallonageForm';

const CalculateGallonage = props => {

    const { show, handleClose, handleCalculate } = props

    const initialState = {
        shape: '',
        length: 0,
        width: 0,
        shortWidth: 0,
        longWidth: 0,
        depth: 0
    }

    const [measurements, setMeasurements] = useState(initialState)

    const handleChange = e => {
        setMeasurements({
            ...measurements,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        e.stopPropagation()

        if (measurements.shape === '') {
            return alert('Please select a pool shape')
        }

        let gallons = gallonageCalculator(measurements)
        handleCalculate(gallons)

        handleClose()
    }

    const showHideClassName =  show ? 'modal-show' : 'modal-hide'

    return (
        <div className={showHideClassName}>
            {/* form cannot be child of form */}
            <form
                onSubmit={handleSubmit}
            >
                <div className='close-button'>
                    <button type='button' onClick={() => handleClose()}>X</button>
                </div>
                <label for='shape-selector'>Shape:</label>
                <select id='shape-selector' name='shape' onChange={handleChange}>
                    <option value=''>--Please select an option--</option>
                    <option value='rectangle'>Rectangle</option>
                    <option value='circular'>Circular</option>
                    {/* TODO */}
                    {/* <option value='irregular'>Kidney/Irregular</option> */}
                </select>

                {measurements.shape !== '' && (
                    <InputGallonageForm handleChange={handleChange} shape={measurements.shape} />
                )}
            </form>
        </div>
    );
};

export default CalculateGallonage;