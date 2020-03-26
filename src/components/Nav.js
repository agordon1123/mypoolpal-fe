import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    return (
        <div className='nav-container'>
            <Link to='/dashboard'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <Link onClick={handleLogout}>Logout</Link>
        </div>
    );
};

export default Nav;