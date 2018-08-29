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

    componentDidMount(){
        console.log('add course component mounted');
    }

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
        var formInfo = this.state.formInfo;
        var emptyForm = {
            courseTitle: '',
            courseCode: '',
            courseUnit: 0
        };
        //console.log(this.props);
        axios.post(`${this.props.match.url}`, formInfo)
            .then(result => {
                this.setState({ successMessage: result.data.message, formInfo: {...emptyForm} });
                this.props.history.push(`${this.props.match.url}`);
            })
            .catch(err => {
                console.log(err);
            });
    };

    render(){
        return (
            <div>
                <p style={{margin: '10px 0px 0px 110px', color: 'green'}}>{this.state.successMessage}</p>
                <div className={classes.addCourses}>
                    <h1>Add courses</h1>
                    <form onSubmit={this.submitForm}>
                        <label>Course Title</label>
                        <input type="text" name="courseTitle" value={this.state.formInfo.courseTitle} onChange={this.handleChange}/>
                        <label>Course Code</label>
                        <input type="text" name="courseCode" value={this.state.formInfo.courseCode} onChange={this.handleChange}/>
                        <label>Course Unit</label>
                        <input type="number" name="courseUnit" value={this.state.formInfo.courseUnit} min="1" max="10" onChange={this.handleChange}/>
                        <input type="submit" value="Add Course"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddCourses;