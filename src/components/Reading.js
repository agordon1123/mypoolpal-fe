import React, { useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Reading = props => {

    useEffect(() => {
        // I need to impliment redux to save from all of these API calls
        // or move the API calls a level up to Dashboard.js

        axiosWithAuth()
            .get()
            .then()
            .catch()

    }, [])
    
    console.log(props);

    return (
        <div className='reading'>
            <p>READING</p>
        </div>
    );
};

export default Reading;