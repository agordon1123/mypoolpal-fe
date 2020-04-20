import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Nav = () => {

    const [showMenu, setShowMenu] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        checkLocation();
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    const checkLocation = () => {
        // return true or false if back button should appear
        if (location.pathname.includes('\/pool\/') || location.pathname === '/add-reading') {
            setShowBack(true)
        } else {
            setShowBack(false);
        }
    }

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }   
        setShowMenu(!showMenu);
    };

    const handleBack = () => {
        history.goBack();
    }

    return (
        <div className='nav-container'>
            {showBack ? (
                <ArrowBackIcon onClick={() => history.goBack()} />
            ) : <p></p>}
            <MenuIcon onClick={toggleDrawer()} />
            <Drawer disableBackdropTransition='true' anchor='top' open={showMenu} onClose={toggleDrawer()}>
                <List role='presentation'>
                    <ListItem>
                        <Link className='nav-link' to='/dashboard'>Home</Link>
                    </ListItem>
                    <ListItem>
                        <Link className='nav-link' to='/login'>Login</Link>
                    </ListItem>
                    <ListItem>
                        <Link className='nav-link' to='/register'>Register</Link>
                    </ListItem>
                    <ListItem>
                        <Link className='nav-link' onClick={() => handleLogout()}>Logout</Link>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Nav;