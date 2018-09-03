import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './Dashboard_Index.css';

const dashboardIndex = (props) => {
    return (
        <div className={classes.dashindex}>
            <div className={classes.firstRow}>
                <Link to={props.match.url}>
                    <span><FontAwesomeIcon icon="home" size="2x"/></span>
                    Dashboard
                </Link>
                <Link to={props.match.url + "/view-biodata"}>
                    <span><FontAwesomeIcon icon="user" size="2x"/></span>
                    View Biodata
                </Link>
                <Link to={props.match.url + "/update-biodata"}>
                    <FontAwesomeIcon icon="user-edit" size="2x"/>
                    Update Biodata
                </Link>
            </div>
            <div className={classes.secondRow}>
                <Link to={props.match.url + "/manage-courses"}>
                    <span><FontAwesomeIcon icon="clipboard-list" size="2x"/></span>
                    Manage Courses
                </Link>
                <Link to={props.match.url + "/logout"}>
                    <span><FontAwesomeIcon icon="sign-out-alt" size="2x"/></span>
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default withRouter(dashboardIndex);