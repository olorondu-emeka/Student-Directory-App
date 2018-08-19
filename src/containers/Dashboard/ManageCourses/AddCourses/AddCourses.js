import React, { Component } from 'react';
import axios from "../../../../axios-instance";
import classes from './AddCourses.css';

class AddCourses extends Component{
    state = {
        formInfo: {
            courseTitle: '',
            courseCode: '',
            courseUnit: 0
        },
        successMessage: ''
    };

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
        var formInfo = this.state.formInfo;
        //console.log(this.props);
        axios.post(`${this.props.match.url}`, formInfo)
            .then(result => {
                this.setState({ successMessage: result.data.message });
                this.props.history.replace(`${this.props.match.url}`);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render(){
        return (
            <div className={classes.addCourses}>
                <p>{this.state.successMessage}</p>

                <h1>Add courses</h1>

                <form onSubmit={this.submitForm}>
                    <label>Course Title</label>
                    <input type="text" name="courseTitle" defaultValue="" onChange={this.handleChange}/>
                    <label>Course Code</label>
                    <input type="text" name="courseCode" onChange={this.handleChange}/>
                    <label>Course Unit</label>
                    <input type="number" name="courseUnit" min="1" max="10" onChange={this.handleChange}/>
                    <input type="submit" value="Add Course"/>
                </form>
            </div>
        );
    }
}

export default AddCourses;