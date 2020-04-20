import React from 'react';
import { useAppState } from '../AppContext';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const SelectPool = props => {
    const { history } = props;
    const [{ pools }, dispatch] = useAppState();

    const handleChange = e => {
        console.log(e.target.value);
        if (e.target.value !== null) {
            return history.push(`/pool/${e.target.value}/new-reading`)
        }
    }

    return (
        <div className='select-pool-container'>
            <h2>Select Pool:</h2>
            <FormControl required className='select-form'>
                <InputLabel>Pool</InputLabel>
                <Select
                    // value={selected}
                    onChange={handleChange}
                >
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