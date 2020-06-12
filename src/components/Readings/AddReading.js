import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { errorHandler } from '../../utils/errorHandler';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const AddReading = props => {
    
    const { history } = props;
    const location = useLocation();
    // will break with double digits
    // maybe can use regex to find first substring with /num/
    // and remove first and last chars
    const poolId = location.pathname.substring(6, 7);

    const [reading, setReading] = useState({
        pool_id: poolId,
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
                const id = res.data.id;
                const path = location.pathname.substring(0, 7)
                history.replace('/dashboard')
                history.push(`${path}/reading/${id}`)
            })
            .catch(err => {
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
                        name='pH' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'pH',
                            'step': '0.1'
                        }}
                    />
                </FormControl>
                <FormControl className='reading-form-input'>
                    <TextField 
                        label='Chlorine' 
                        type='number'
                        name='chlorine' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'chlorine',
                            'step': '0.1'
                        }}
                    />
                </FormControl>
                <FormControl className='reading-form-input'>
                    <TextField 
                        label='Alkalinity' 
                        type='number'
                        name='alkalinity' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'alkalinity',
                            'step': '10'
                        }}
                    />
                </FormControl>
                <FormControl className='reading-form-input'>
                    <TextField 
                        label='Salinity' 
                        type='number'
                        name='salinity' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'salinity',
                            'step': '50'
                        }}
                    />
                </FormControl>
                <Button variant='contained' type='submit' className='form-button'>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddReading;