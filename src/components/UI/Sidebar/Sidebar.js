import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Sidebar.css';


const sidebar = (props) => {
    var theUrl = props.match.url;
        return(
            <div className={classes.sidebar}>
                <header>
                    <h2>Navigation</h2>
                </header>
                <ul>
                    <NavLink to={theUrl} exact activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="home"/></span>
                        Dashboard
                    </NavLink>
                    <NavLink to={theUrl + "/view-biodata"} activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="user"/></span>
                        View Biodata
                    </NavLink>
                    <NavLink to={theUrl + "/update-biodata" } activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="user-edit"/></span>
                        Update Biodata
                    </NavLink>
                    <NavLink to={theUrl + "/manage-courses"} activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="clipboard-list"/></span>
                        Manage Courses
                    </NavLink>
                    <NavLink to={theUrl + "/logout"} activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="sign-out-alt"/></span>
                        Logout
                    </NavLink>
                    <NavLink to={theUrl + "/delete-account"} activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="trash"/></span>
                        Delete account
                    </NavLink>
                </ul>
            </div>
        );
};

export default withRouter(sidebar);