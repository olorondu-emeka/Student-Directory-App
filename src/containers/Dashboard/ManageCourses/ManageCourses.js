import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import AddCourses from './AddCourses/AddCourses';
import ViewCourses from './ViewCourses/ViewCourses';
import classes from './ManageCourses.css';
import axios from "../../../axios-instance";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ManageCourses extends Component{
    state = {
        courses: [],
        contentLoaded: false
    };

    tracker = 1;
    initialTracker = 1;
    componentUpdated = 0;

    componentDidMount(){
        //console.log('dashboard component mounted');
        axios.get(`${this.props.match.url}`)
            .then(result => {
                this.componentUpdated = 0;
                this.setState({ courses: result.data.student.courses, contentLoaded: true });
                this.tracker = 2;

            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidUpdate(){

        this.componentUpdated += 1;
        //console.log('dashboard component updated', this.componentUpdated);
        if((this.tracker > 1) && (this.initialTracker > 1)){
            if(this.componentUpdated < 2){
                axios.get(`${this.props.match.url}`)
                    .then(result => {
                        this.setState({ courses: result.data.student.courses, contentLoaded: true });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

            if (this.componentUpdated === 2){
                this.componentUpdated = 0;
            }
        }//end outer if

        this.initialTracker = 2;

        //console.log('end of dashboard component updated');
    }

    render(){

        //render components
        if(this.state.contentLoaded){
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
                    <Route path={this.props.match.url} exact render={() => <ViewCourses theCourses={this.state.courses}/>} />
                </div>
            );
        }
        else{
            return(
                <p>Loading</p>
            );
        }
    }
}

export default ManageCourses;