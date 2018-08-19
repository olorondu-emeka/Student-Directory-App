import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../../axios-instance';
import classes from './ViewCourses.css';

class ViewCourses extends Component{
    state = {
        courses: this.props.theCourses,
        successMessage: ''
    };

    componentWillReceiveProps(nextProps){
        if(this.props.theCourses !== nextProps.theCourses){
            console.log('component received props');
            this.setState({
                courses: nextProps.theCourses
            });

        }
    }

    deleteCourse = (event, theID) => {
        axios.delete(`${this.props.match.url}?course_id=${theID}`)
            .then(result => {
                this.setState({
                    courses: result.data.updatedCourses,
                    successMessage: result.data.message
                });
                this.props.history.replace(`${this.props.match.url}`);
            })
            .catch(err => {
                console.log(err);
            });


    };

    render(){
        var deleteHandler = this.deleteCourse;
        var theCourses = (
            <tr>
                <td>No course has been registered</td>
            </tr>
        );


        if(this.state.courses.length > 0){
            theCourses = [...this.state.courses].map(function(course, index){

                return (
                    <tr key={course._id}>
                        <td>{index + 1}</td>
                        <td>{course.courseTitle}</td>
                        <td>{course.courseCode}</td>
                        <td>{course.courseUnit}</td>
                        <td>
                            <button onClick={(event) => deleteHandler(event, course._id)} className={classes.delete}>Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        return (

            <div className={classes.viewcourses}>
                <h1>Registered Courses</h1>
                <p>{this.state.successMessage}</p>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th className={classes.heading1}>S/N</th>
                                <th className={classes.heading2}>Course Title</th>
                                <th className={classes.heading3}>Course Code</th>
                                <th className={classes.heading4}>Course Unit</th>
                                <th className={classes.heading5}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {theCourses}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewCourses);