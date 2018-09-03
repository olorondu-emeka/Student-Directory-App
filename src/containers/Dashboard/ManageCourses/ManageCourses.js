import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import AddCourses from './AddCourses/AddCourses';
import ViewCourses from './ViewCourses/ViewCourses';
import classes from './ManageCourses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ManageCourses extends Component{

    render(){
        return(
            <div className={classes.manageCourses}>
                <nav>
                    <NavLink to={this.props.match.url} exact activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="eye"/></span>
                        View Courses
                    </NavLink>
                    <NavLink to={this.props.match.url + "/add-courses"} activeClassName={classes.active}>
                        <span><FontAwesomeIcon icon="plus"/></span>
                        Add Courses
                    </NavLink>
                </nav>
                <Route path={this.props.match.url + "/add-courses"}  component={AddCourses} />
                <Route path={this.props.match.url} exact component={ViewCourses} />
            </div>
        );
    }
}

export default ManageCourses;