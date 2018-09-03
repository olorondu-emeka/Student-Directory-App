import React from 'react';
import classes from './Logout.css';
import { withRouter } from 'react-router-dom';

const logout = (props) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('token');
        props.history.replace('/login');
    };

    const cancelLogoutHandler = () => {
        props.history.replace('/dashboard');
    };


    return (
        <div className={classes.logout}>
            <p>Are you sure you want to logout?</p>
            <div>
                <button onClick={logoutHandler}>Yes</button>
                <button onClick={cancelLogoutHandler}>No</button>
            </div>
        </div>
    );
};

export default withRouter(logout);