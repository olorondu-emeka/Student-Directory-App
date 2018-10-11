import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios-instance';
import classes from './Register.css';
import Header from '../../components/UI/Header/Header';
import Spinner from '../../components/UI/Spinner/Spinner';

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

        submitMessage: '',
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

    submitForm = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        var formInfo = this.state.formInfo;
        axios.post('/register', formInfo)
            .then(result => {
                this.setState({loading: false});

                // set the token in local storage
                window.localStorage.setItem('token', result.data.token);

                //redirect to dashboard
                this.props.history.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
            });
    };


    render(){
        if (this.state.loading){
            return <Spinner/>
        }
        else{
            return (
                <div>
                    <Header/>
                    <div className={classes.register}>
                        <h1>Register</h1>
                        <form onSubmit={this.submitForm}>
                            <label>Surname</label>
                            <input type="text" name="surname" onChange={this.handleChange} required/>
                            <label>First name</label>
                            <input type="text" name="firstname" onChange={this.handleChange} required/>
                            <label>Level</label>
                            <input type="number" name="level" min="100" max="500"  step="100" onChange={this.handleChange} required/>
                            <label>Matric No</label>
                            <input type="text" name="matricNo" onChange={this.handleChange} required/>
                            <label>Course</label>
                            <input type="text" name="course" onChange={this.handleChange} required/>
                            <label>Password</label>
                            <input type="password" name="password" onChange={this.handleChange} required/>
                            <input type="submit" value="submit" />
                        </form>
                        <p>Already a member?
                            <span>
                        <NavLink to="/login"> Log In</NavLink>
                    </span>
                        </p>
                    </div>

                </div>
            );
        }
    }
}

export default Register;