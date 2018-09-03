import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from "../../../../axios-instance";
import classes from './AddCourses.css';
import * as action from '../../../../store/actions/index';
import Spinner from '../../../../components/UI/Spinner/Spinner';


class AddCourses extends Component{
    state = {
        formInfo: {
            courseTitle: '',
            courseCode: '',
            courseUnit: 1
        },
        successMessage: '',
        loading: false
    };


    componentDidUpdate(){
        console.log('add course component updated');
    }

    handleChange = (event) => {

        //console.log(theForm);
        var theFormInfo = {
            ...this.state.formInfo,
            [event.target.name]: event.target.value
        };
        this.setState({
            formInfo: theFormInfo
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        var formInfo = this.state.formInfo;
        var emptyForm = {
            courseTitle: '',
            courseCode: '',
            courseUnit: 1
        };
        //console.log(this.props);
        axios.post(`${this.props.match.url}/${this.props.theID}`, formInfo)
            .then(result => {
                //add course to redux state
                this.props.onCourseAdd(result.data.addedCourse);

                this.setState({ successMessage: result.data.message, formInfo: {...emptyForm}, loading: false });
                this.props.history.push(`${this.props.match.url}`);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render(){
        if (this.state.loading){
            return <Spinner/>;
        }
        else{
            return (
                <div>
                    <p style={{margin: '10px 0px 0px 110px', color: 'green'}}>{this.state.successMessage}</p>
                    <div className={classes.addCourses}>
                        <h1>Add courses</h1>
                        <form onSubmit={this.submitForm}>
                            <label>Course Title</label>
                            <input type="text" name="courseTitle" value={this.state.formInfo.courseTitle} onChange={this.handleChange} required/>
                            <label>Course Code</label>
                            <input type="text" name="courseCode" value={this.state.formInfo.courseCode} onChange={this.handleChange} required/>
                            <label>Course Unit</label>
                            <input type="number" name="courseUnit" value={this.state.formInfo.courseUnit} min="1" max="10" onChange={this.handleChange} required/>
                            <input type="submit" value="Add Course"/>
                        </form>
                    </div>
                </div>
            );
        }

    }
}

const mapStateToProps = state => {
   return {
       theID: state.student._id
   }
};
const mapDispatchToProps = dispatch => {
    return {
        onCourseAdd: (course) => dispatch(action.updateCourse(course))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourses);