import React, { Component } from 'react';
import classes from './Login.css';
import axios from "../../axios-instance";
import TheAxios from 'axios';
import { NavLink } from "react-router-dom";
import Header from '../../components/UI/Header/Header';


class Login extends Component{
    state = {
        formInfo: {
            matricNo: '',
            password: ''
        },
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

    getToken  (token)  {

        if (token) {
            TheAxios.defaults.headers.common['authorization'] = token;
            console.log('the token', TheAxios.defaults.headers.common['authorization']);
        } else {
            TheAxios.defaults.headers.common['authorization'] = null;
            console.log('the token', token);
            /*if setting null does not remove `Authorization` header then try
              delete axios.defaults.headers.common['Authorization'];
            */
        }
    };

    submitForm = (event) => {
        event.preventDefault();
        var formInfo = this.state.formInfo;
        axios.post('/login', formInfo)
            .then(result => {
                if (result.data.authorized){

                    //get token value from result.data.token store and store it in the axios header
                    this.getToken(result.data.token);

                    //store token in local storage
                    window.localStorage.setItem('token', result.data.token);

                    //redirect to dashboard
                    this.props.history.replace(`/dashboard`);
                    console.log(result.data, "redirected to dashboard");
                }
                else{
                    this.setState({ errorMessage: result.data.message });
                    this.props.history.replace('/login');
                    console.log(result.data, 'redirected to login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render(){
        return (
            <div>
                <Header/>
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
            </div>

        );
    }
}


export default Login;