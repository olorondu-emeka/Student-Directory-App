import React from 'react';
import classes from './Logout.css';
import { withRouter } from 'react-router-dom';

const logout = (props) => {
    const logoutHandler = () => {
        window.localStorage.removeItem('token');
        props.history.replace('/login');
    };
    return (
        <div className={classes.logout}>
            <p>Are you sure you want to logout?</p>
            <div>
                <button onClick={logoutHandler}>Yes</button>
                <button>No</button>
            </div>
        </div>
    );
};

export default withRouter(logout);