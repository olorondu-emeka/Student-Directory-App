import React, { Component } from 'react';
import classes from './ViewBiodata.css';


class ViewBiodata extends Component {
    state = {
        student: this.props.theStudent
    };

    componentWillReceiveProps(nextProps){
        if(this.props.theStudent !== nextProps.theStudent){
            console.log('component received props');
            this.setState({
                student: nextProps.theStudent
            });

        }
    }

    componentDidMount(){
        console.log('view component mounted');
    }

    componentDidUpdate(){
        console.log(' VIEW biodata component updated');
    }

    render(){
        console.log(this.state.student);
        if(this.state.student !== null){
            return (
                <div className={classes.viewbio}>
                    <h1>Your Biodata</h1>
                    <table>
                        <thead>
                        <tr>
                            <th className={classes.firstHeading}>Name</th>
                            <th className={classes.secondHeading}>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Matriculation Number</td>
                            <td>{this.state.student.credentials.matricNo}</td>
                        </tr>
                        <tr>
                            <td>Surname</td>
                            <td>{this.state.student.biodata.surname}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{this.state.student.biodata.firstname}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{this.state.student.credentials.course}</td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td>{this.state.student.biodata.level}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.student.biodata.email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{this.state.student.biodata.phoneNo}</td>
                        </tr>
                        <tr>
                            <td>Date of birth</td>
                            <td>{this.state.student.biodata.dob}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{this.state.student.biodata.address}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        else{
            return (
                <p>Loading...</p>
            );
        }

    }
}

export default ViewBiodata;