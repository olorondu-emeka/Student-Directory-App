import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios-instance';
import classes from './Register.css';

class Register extends Component{
    state = {
        formInfo: {
            surname: '',
            firstname: '',
            level: 0,
            matricNo: '',
            course: '',
            password: ''
        },

        submitMessage: ''
    };

    handleChange = (event) => {
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
        axios.post('/register', formInfo)
            .then(result => {
                console.log(result.data);
                console.log(formInfo);
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            });
    };


    render(){
        return (
            <div className={classes.register}>
                <h1>Register</h1>
                <form onSubmit={this.submitForm}>
                    <label>Surname</label>
                    <input type="text" name="surname" onChange={this.handleChange}/>
                    <label>First name</label>
                    <input type="text" name="firstname" onChange={this.handleChange}/>
                    <label>Level</label>
                    <input type="number" name="level" min="100" max="500"  step="100" onChange={this.handleChange}/>
                    <label>Matric No</label>
                    <input type="text" name="matricNo" onChange={this.handleChange}/>
                    <label>Course</label>
                    <input type="text" name="course" onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="submit" />
                </form>
                <p>Already a member?
                    <span>
                        <NavLink to="/login"> Log In</NavLink>
                    </span>
                </p>
            </div>
        );
    }
}

export default Register;