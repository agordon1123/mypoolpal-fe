import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

const Footer = () => {

    const [value, setValue] = useState(-1);
    const location = useLocation();
    
    // update footer as location changes
    useEffect(() => {
        switch(location.pathname) {
            case '/dashboard':
                setValue(1);
                break;
            case '/add-reading':
                setValue(2);
                break;
            default:
                setValue(-1);
                break;
        }
    }, [location.pathname])

    return (
        <div className='footer-container'>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                showLabels
                >
                <BottomNavigationAction label="Troubleshoot" icon={<BuildIcon className='troubleshoot-svg' style={ value === 0 ? { color: '#1974D2' } : null }/>} />
                <BottomNavigationAction label="Home" icon={<Link to='/dashboard' style={ value === 1 ? { color: '#1974D2' } : { color: '#757575' } }><HomeIcon style={ value === 1 ? { color: '#1974D2' } : null } /></Link>} />
                <BottomNavigationAction label="Reading" icon={<Link to='/add-reading' style={ value === 2 ? { color: '#1974D2' } : { color: '#757575' } }><AddIcon style={ value === 2 ? { color: '#1974D2' } : null } /></Link>} />
            </BottomNavigation>
        </div>
    );
};

export default Footer;