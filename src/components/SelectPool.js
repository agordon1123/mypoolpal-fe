import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { errorHandler } from '../utils/errorHandler';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectPool = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));
    const [pools, setPools] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get(`${process.env.REACT_APP_DB_URL}/pools/all/${user.id}`)
            .then(res => {
                console.log(res);
                setPools(res.data);
            })
            .catch(err => {
                errorHandler(err.response, history);
            })
    }, [])

    const handleChange = e => {
        console.log(e.target.value);
        if (e.target.value !== null) {
            return history.push(`/pool/${e.target.value}/new-reading`)
        }
    }

    return (
        <div className='select-pool-container'>
            <FormControl required className='select-form'>
                <InputLabel>Pool</InputLabel>
                <Select
                    // value={selected}
                    onChange={handleChange}
                >
                    {/* <MenuItem value={null}>
                        <em></em>
                    </MenuItem> */}
                    {pools.length > 0 && (
                        pools.map((el, i) => (
                            <MenuItem value={el.id}>{el.title}</MenuItem>
                        ))
                    )}
                </Select>
                <FormHelperText>Required</FormHelperText>
            </FormControl>
        </div>
    );
};

export default SelectPool;