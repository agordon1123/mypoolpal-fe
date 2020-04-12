import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const Nav = () => {

    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log("clicked")
    }

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }   
        setShowMenu(!showMenu);
    };

    return (
        <div className='nav-container'>
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