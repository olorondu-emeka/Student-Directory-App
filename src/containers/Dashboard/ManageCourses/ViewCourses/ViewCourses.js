import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../../../../axios-instance';
import classes from './ViewCourses.css';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions/index';

class ViewCourses extends Component{
    state = {
        courses: this.props.courses,
        successMessage: '',
        loading: false
    };

    //set up local copy of the redux state
    //to handle real time props change
    componentWillReceiveProps(nextProps){
        if(this.props.courses !== nextProps.courses){
            console.log('component received props', nextProps.courses);
            this.setState({
                courses: nextProps.courses
            });

        }
    }

    deleteCourse = (event, theID, courseIndex) => {
        this.setState({loading: true});
        axios.delete(`${this.props.match.url}/${this.props.studentID}?course_id=${theID}`)
            .then(result => {

                //show deleted course to reflect in the redux State
                this.props.onCourseDelete(courseIndex);

                this.setState({
                    successMessage: result.data.message,
                    courses: result.data.updatedCourses,
                    loading: false
                });

                //redirect to the same page
                this.props.history.push(`${this.props.match.url}`);

            })
            .catch(err => {
                console.log(err);
            });


    };

    render(){
        var deleteHandler = this.deleteCourse;
        var theCourses = (
            <tr style={{width: '100%', textAlign: 'center'}} >
                <td colSpan="5">No course has been registered</td>
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
                            <button onClick={(event) => deleteHandler(event, course._id, index)} className={classes.delete}>Delete</button>
                        </td>
                    </tr>
                );
            });
        }

        //components to be rendered
        if (this.state.loading) {
            return (
                <p>Loading...</p>
            );
        }
        else{
            return (

                <div className={classes.viewcourses}>
                    <h1>Registered Courses</h1>
                    <p style={{color: 'green', paddingLeft: '32px'}}>{this.state.successMessage}</p>
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
}

const mapStateToProps = state => {
  return {
      courses: state.student.courses,
      studentID: state.student._id
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onCourseDelete: (theIndex) => dispatch(action.deleteCourse(theIndex))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewCourses));