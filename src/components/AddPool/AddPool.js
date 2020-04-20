import React, { useState } from 'react';
import CalculateGallonage from './CalculateGallonage';
import { useAppState } from '../../AppContext';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { errorHandler } from '../../utils/errorHandler';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const AddPool = props => {
    const { history } = props;
    const [{ pools }, dispatch] = useAppState();
    const [modal, setModal] = useState({ show: false })

    const [pool, setPool] = useState({
        user_id: JSON.parse(localStorage.getItem('user')).id,
        title: '',
        gallonage: '',
        is_salt_water: ''
    })

    const handleClose = () => {
        setModal({ show: false })
    }

    const handleCalculate = gallonage => {
        setPool({
            ...pool,
            gallonage: gallonage
        })
    }

    const handleChange = e => {
        setPool({
            ...pool,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        // filter out commas and convert from string to integer
        const re=/,/gi;
        pool.gallonage = pool.gallonage.toString();
        let newGallonage = parseInt(pool.gallonage.trim().replace(re, ''));
        if (pool.gallonage === '') {
            return alert('Pool cannot have gallonage of 0')
        } else if (isNaN(newGallonage)) {
            setPool({ ...pool, gallonage: '' })
            return alert('Gallonage must be a valid number')
        }

        pool.gallonage = newGallonage;
        // convert string to boolean
        pool.is_salt_water === 'salt' ? pool.is_salt_water = 1 : pool.is_salt_water = 0;
        
        axiosWithAuth()
            .post(`${process.env.REACT_APP_DB_URL}/pools/`, pool)
            .then(res => {
                // add new pool to state and push to detailed view
                let newState = pools;
                newState.push(res.data);
                dispatch({ type: 'SET_POOLS', payload: newState });
                history.replace('/dashboard');
                history.push(`/pool/${res.data.id}`);
            })
            .catch(err => errorHandler(err.response, history));
    }

    return (
        <div className='add-pool-container'>
            <h2>Pool Info:</h2>
            <form onSubmit={handleSubmit}>
                <FormControl className='pool-form-input'>
                    <TextField 
                        label='Title' 
                        type='text'
                        name='title' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'title',
                        }}
                    />
                </FormControl>
                <CalculateGallonage 
                    show={modal.show} 
                    handleClose={handleClose} 
                    handleCalculate={handleCalculate}
                />
                <FormControl className='pool-form-input'>
                    <TextField 
                        label='Gallonage' 
                        type='text'
                        name='gallonage'
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'gallonage',
                        }}
                    />
                <Button type='button' className='set-modal form-button' onClick={() => setModal({ show: true })}>Calculate</Button>
                </FormControl>
                <FormControl variant='outlined' className='select-sanitizer'>
                    <InputLabel htmlFor='outlined-age-native-simple'>Sanitizer</InputLabel>
                    <Select
                        // native
                        className='material-select'
                        value={pool.is_salt_water}
                        onChange={handleChange}
                        label='Sanitizer'
                        inputProps={{
                            name: 'is_salt_water',
                        }}
                    >
                    {/* <option aria-label='None' value=''/> */}
                    <option name='salt' value='salt'>Salt</option>
                    <option name='chlorine' value='chlorine'>Chlorine</option>
                    </Select>
                </FormControl>
                <Button type='submit' className='form-button'>Go</Button>
            </form>
        </div>
    );
};

export default AddPool;