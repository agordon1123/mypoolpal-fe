import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const history = useHistory();

    const [credentials, setCredentials] = useState({
        first_name: '',
        last_name: '',
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
            .post(`${process.env.REACT_APP_DB_URL}/users/register`, credentials)
            .then(res => {
                console.log(res);
                // currently not doing anything with data returned at register
                return history.push('/login');
                
                // still deciding if redux is necessary
                // if so, we will add the user to an app state
                // if not, we will add the user to localStorage
                //    and pull IDs from there
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit} className='Register'>
            <label for='first name'>First name:</label>
            <input
                type='text'
                name='first_name'
                onChange={handleChange}
            />
            <label for='last name'>Last Name:</label>  
            <input
                type='text'
                name='last_name'
                onChange={handleChange}
            />
            <label for='email'>Email:</label>
            <input
                type='email'
                name='email'
                onChange={handleChange}
            />
            <label for='password'>Password:</label>
            <input
                type='password'
                name='password'
                onChange={handleChange}
            />
            <button type='submit'>Go</button>
        </form>
    );
};

export default Register;