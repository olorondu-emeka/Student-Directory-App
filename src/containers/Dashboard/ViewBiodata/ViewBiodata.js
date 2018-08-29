import React, { Component } from 'react';
import classes from './ViewBiodata.css';
import { connect } from 'react-redux';


class ViewBiodata extends Component {

    // componentWillReceiveProps(nextProps){
    //     if(this.props.theStudent !== nextProps.theStudent){
    //         console.log('component received props');
    //         this.setState({
    //             student: nextProps.theStudent
    //         });
    //
    //     }
    // }

    componentDidMount(){
        console.log('view component mounted');
    }

    componentDidUpdate(){
        console.log(' VIEW biodata component updated');
    }

    render(){
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
                        <td>{this.props.student.credentials.matricNo}</td>
                    </tr>
                    <tr>
                        <td>Surname</td>
                        <td>{this.props.student.biodata.surname}</td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td>{this.props.student.biodata.firstname}</td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>{this.props.student.credentials.course}</td>
                    </tr>
                    <tr>
                        <td>Level</td>
                        <td>{this.props.student.biodata.level}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{this.props.student.biodata.email}</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>{this.props.student.biodata.phoneNo}</td>
                    </tr>
                    <tr>
                        <td>Date of birth</td>
                        <td>{this.props.student.biodata.dob}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{this.props.student.biodata.address}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        student: state.student
    };
};

export default connect(mapStateToProps)(ViewBiodata);