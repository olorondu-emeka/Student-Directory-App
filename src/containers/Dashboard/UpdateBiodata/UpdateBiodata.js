import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from "../../../axios-instance";
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './UpdateBiodata.css';
import * as actionType from '../../../store/actions/index';

class UpdateBiodata extends Component{

    state = {
        student: this.props.student,
        formInfo: {
            email: '',
            phoneNo: '',
            address: '',
            dob: ''
        },
        successMessage: '',
        loading: false
    };

    //to handle real time props change
    componentWillReceiveProps(nextProps){
        if(this.props.student !== nextProps.student){
            this.setState({
                student: nextProps.student
            });

        }
    }

    componentDidMount(){
        var theForm = {
            email: this.state.student.biodata.email,
            phoneNo: this.state.student.biodata.phoneNo,
            address: this.state.student.biodata.address,
            dob: this.state.student.biodata.dob
        };
        this.setState({ formInfo: theForm});
    }

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

        //set the spinner to be true while form submission is on
        //afterwards, set spinner to false to remove spinner
        this.setState({loading: true});
        var formInfo = this.state.formInfo;

        axios.patch(`${this.props.match.url}/${this.props.studentID}`, formInfo)
            .then(result => {

                //send the updated info to the redux store
                this.props.onBiodataUpdate(formInfo);

                this.setState({ successMessage: result.data.message, loading: false });

                this.props.history.push(`${this.props.match.url}`);
            })
            .catch(err => {
                console.log(err);
            });
    };


    render(){
        if (this.state.loading){
            return (
               <Spinner/>
            );
        }

        else{
            return (
                <div>
                    <p style={{margin: '90px 0px 0px 187px', color: 'green'}}>{this.state.successMessage}</p>
                    <div className={classes.bio}>
                        <h1>Update Biodata </h1>
                        <form onSubmit={this.submitForm}>
                            <label>Matriculation Number</label>
                            <input type="text" value={this.state.student.credentials.matricNo} readOnly/>
                            <label>Surname</label>
                            <input type="text"  value={this.state.student.biodata.surname} readOnly/>
                            <label>First Name</label>
                            <input type="text" value={this.props.student.biodata.firstname} readOnly/>
                            <label>Department</label>
                            <input type="text"  defaultValue={this.state.student.credentials.course} readOnly/>
                            <label>Level</label>
                            <input type="text" value={this.state.student.biodata.level} readOnly/>
                            <label>Email</label>
                            <input type="email" name="email" defaultValue={this.state.student.biodata.email} onChange={this.handleChange} required/>
                            <label>Phone Number</label>
                            <input type="text" name="phoneNo" defaultValue={this.state.student.biodata.phoneNo} onChange={this.handleChange} required/>
                            <label>DOB</label>
                            <input type="date" name="dob" placeholder="DD/MM/YYYY" defaultValue={this.state.student.biodata.dob} onChange={this.handleChange} required/>
                            <label>Address</label>
                            <textarea name="address" rows="4" defaultValue={this.state.student.biodata.address} onChange={this.handleChange} required></textarea>
                            <input type="submit" value="Update biodata" />
                        </form>
                    </div>
                </div>

            );
        }

    }
}

const mapStateToProps = state => {
    return {
        student: state.student,
        studentID: state.student._id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onBiodataUpdate: (theBiodata) => dispatch(actionType.updateBiodata(theBiodata))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateBiodata));