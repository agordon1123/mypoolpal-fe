import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { errorHandler } from '../../utils/errorHandler';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const AddReading = props => {
    
    // console.log(props.history)
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