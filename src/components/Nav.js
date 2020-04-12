import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';

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
            <Drawer style={{ maxWidth: '480px' }} open={showMenu} onClose={toggleDrawer()}>
                <Link to='/dashboard'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                <Link onClick={() => handleLogout()}>Logout</Link>
            </Drawer>
        </div>
    );
};

export default Nav;