import React, { Component } from 'react';
import classes from './Login.css';
import axios from "../../axios-instance";
import {NavLink} from "react-router-dom";

class Login extends Component{
    state = {
        formInfo: {
            matricNo: '',
            password: ''
        },
        student: {},
        errorMessage: ''
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
        axios.post('/login', formInfo)
            .then(result => {
                if (result.data.authorized){
                    this.setState({ student: result.data.user });
                    this.props.history.replace(`/dashboard/${this.state.student._id}`);
                    console.log(result.data);
                }
                else{
                    this.setState({ errorMessage: result.data.message });
                    this.props.history.replace('/login');
                    console.log(result.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render(){
        return (
            <div className={classes.login}>
                <h1>Login</h1>
                <p className={classes.errMsg}>{this.state.errorMessage}</p>
                <form onSubmit={this.submitForm}>
                    <label>Matric no</label>
                    <input type="text" name="matricNo" onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handleChange}/>
                    <input type="submit" value="submit" />
                </form>
                <p>Not yet a member?
                    <span>
                        <NavLink to="/register"> Register</NavLink>
                    </span>
                </p>
            </div>
        );
    }
}

export default Login;