import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PoolIcon from '@material-ui/icons/Pool';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const Login = () => {

    const history = useHistory();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        showPassword: false
    });

    console.log(credentials);

    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    const handleClickShowPassword = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword
        })
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_DB_URL}/users/login`, credentials)
            .then(res => {
                console.log(res.data.token)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                return history.push('/dashboard')
                
                // still deciding if redux is necessary
                // if so, we will add the user to an app state
                // if not, we will add the user to localStorage
                //    and pull IDs from there
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='login-container'>
            <PoolIcon style={{ fontSize: '180px', color: '#1975D2', marginTop: '2rem' }} />
            <form onSubmit={handleSubmit}>
                <FormControl className='auth-form-input'>
                    <TextField 
                        label='Email' 
                        type='email' 
                        name='email' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'email',
                        }}
                    />
                </FormControl>
                <FormControl className='auth-form-input'>
                    <TextField 
                        label='Password' 
                        type={credentials.showPassword ? 'text' : 'password'}
                        name='password' 
                        onChange={handleChange}
                        inputProps={{
                            'aria-label': 'password',
                        }}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={() => console.log('mouse down')}
                                >
                                    {credentials.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button variant='contained' type='submit' className='form-button'>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default Login;
