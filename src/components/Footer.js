import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

const Footer = () => {

    const [value, setValue] = useState(1);
    // TODO: work into router

    return (
        <div className='footer-container'>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                showLabels
                >
                <BottomNavigationAction label="Recents" icon={<ListIcon fontSize='large' style={ value === 0 ? { color: '#1974D2' } : null }/>} />
                <BottomNavigationAction label="Home" icon={<HomeIcon style={ value === 1 ? { color: '#1974D2' } : null } />} />
                <BottomNavigationAction label="Add" icon={<AddIcon style={ value === 2 ? { color: '#1974D2' } : null } />} />
            </BottomNavigation>
        </div>
    );
};

export default Footer;