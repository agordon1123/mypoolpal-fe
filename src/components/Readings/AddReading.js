import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { errorHandler } from '../../utils/errorHandler';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

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
        <div className='add-reading-container'>
            <h2>Alex's Oasis*</h2>
            <p>Enter Readings:</p>
            <form onSubmit={handleSubmit}>
                <FormControl className='reading-form-input'>
                    <TextField 
                        label='pH' 
                        type='number'
                        step='0.1'
                        name='pH' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'pH',
                        }}
                    />
                </FormControl>
                <FormControl className='reading-form-input'>
                    <TextField 
                        label='Chlorine' 
                        type='number'
                        step='0.1'
                        name='chlorine' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'chlorine',
                        }}
                    />
                </FormControl>
                <FormControl className='reading-form-input'>
                    <TextField 
                        label='Alkalinity' 
                        type='number'
                        step='10'
                        name='alkalinity' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'alkalinity',
                        }}
                    />
                </FormControl>
                <FormControl className='reading-form-input'>
                    <TextField 
                        label='Salinity' 
                        type='number'
                        step='50'
                        name='salinity' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'salinity',
                        }}
                    />
                </FormControl>
                <Button variant='contained' type='submit' className='form-button'>
                    Submit
                </Button>
                {/* <label for='pH'>pH:</label>
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

                <button type='submit'>Go</button> */}
            </form>
        </div>
    );
};

export default AddReading;