import React from 'react';
import { NavLink, Link } from 'react-router-dom'

import classes from './Header.css'

const header = () => {
    return (
        <nav className={classes.Nav}>
            <Link to="/" className={classes.logo}>
                <span>Student </span> Directory
            </Link>
            <ul>
                <NavLink to="/register" exact activeClassName={classes.active}>Register</NavLink>
                <NavLink to="/login" activeClassName={classes.active}>Login</NavLink>
            </ul>
        </nav>
    );
};

export default header;