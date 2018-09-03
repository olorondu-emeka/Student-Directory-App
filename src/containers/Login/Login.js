import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import TheAxios from 'axios';

import classes from './Login.css';
import axios from "../../axios-instance";
import Header from '../../components/UI/Header/Header';
import Spinner from '../../components/UI/Spinner/Spinner';

class Login extends Component{
    state = {
        formInfo: {
            matricNo: '',
            password: ''
        },
        errorMessage: '',
        loading: false
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

        //display spineer while attempting to log in
        this.setState({loading: true});

        var formInfo = this.state.formInfo;
        axios.post('/login', formInfo)
            .then(result => {
                if (result.data.authorized){

                    //get token value from result.data.token store and store it in the axios header
                    this.getToken(result.data.token);

                    //store token in local storage
                    window.localStorage.setItem('token', result.data.token);

                    //stop the spinner from displaying
                    this.setState({loading: false});

                    //redirect to dashboard
                    this.props.history.replace(`/dashboard`);
                    console.log(result.data, "redirected to dashboard");
                }
                else{
                    this.setState({ errorMessage: result.data.message, loading: false });
                    this.props.history.replace('/login');
                    console.log(result.data, 'redirected to login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render(){
        var errorMessage = <p className={classes.errMsg}>{this.state.errorMessage}</p>;
        if (this.state.loading){
            errorMessage = <Spinner/>
        }
        return (
            <div>
                <Header/>
                <div className={classes.login}>
                    <h1>Login</h1>
                    {errorMessage}
                    <form onSubmit={this.submitForm}>
                        <label>Matric no</label>
                        <input type="text" name="matricNo" onChange={this.handleChange} required/>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handleChange} required/>
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