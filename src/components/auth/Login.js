import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

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
                console.log(res);
                localStorage.setItem('token', res.data.token);
                // still deciding if redux is necessary
                // if so, we will add the user to an app state
                // if not, we will add the user to localStorage
                //    and pull IDs from there
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <input
                type='email'
                name='email'
                onChange={handleChange}
            />
            <input
                type='password'
                name='password'
                onChange={handleChange}
            />
            <button
                type='submit'
                onClick={(e) => handleSubmit(e)}
            >Go</button>
        </div>
    );
};

export default Login;