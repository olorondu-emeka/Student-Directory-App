import React from 'react';
import { NavLink } from 'react-router-dom'
import classes from './Header.css'

const header = () => {
    return (
        <nav className={classes.Nav}>
            <h1>Student Directory</h1>
            <ul>
                <NavLink to="/register" exact>Register</NavLink>
                <NavLink to="/login">Login</NavLink>
            </ul>
        </nav>
    );
};

export default header;