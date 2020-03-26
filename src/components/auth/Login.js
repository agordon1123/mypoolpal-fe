import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const history = useHistory();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = event => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_DB_URL}/users/login`, credentials)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                return history.push('/dashboard');
                
                // still deciding if redux is necessary
                // if so, we will add the user to an app state
                // if not, we will add the user to localStorage
                //    and pull IDs from there
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label for ='email'>Email</label>
            <input
                type='email'
                name='email'
                onChange={handleChange}
            />
            <label for='password'>Password</label>
            <input
                type='password'
                name='password'
                onChange={handleChange}
            />
            <button
                type='submit'
            >Go</button>
        </form>
    );
};

export default Login;