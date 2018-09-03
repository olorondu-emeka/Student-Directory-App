import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import TheAxios from 'axios';

import Sidebar from '../../components/UI/Sidebar/Sidebar';
import ViewBiodata from './ViewBiodata/ViewBiodata';
import UpdateBiodata from './UpdateBiodata/UpdateBiodata';
import ManageCourses from './ManageCourses/ManageCourses';
import DashboardIndex from './Dashboard_Index/Dashboard_index';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import Logout from '../Logout/Logout';
import classes from './Dashboard.css';

import  * as  theAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';



class Dashboard extends Component{

    componentWillMount(){
        const theToken = window.localStorage.getItem('token');
        if (theToken !== null){

            //set token in header
           this.getToken(theToken);

        }
        else{
            //redirect to the login page
            this.props.history.replace('/login');
        }
    }

    // make an axios get request in the reducer middleware
    componentDidMount(){
        this.props.updateTheStudent(`/dashboard`);
    }


    getToken  (token) {

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


    render() {
        if (this.props.contentLoaded) {
            return (
                <div className={classes.dashboard}>
                    <Sidebar />
                    <div className={classes.dashboard_body}>
                        <div>
                            <header>
                                <h1>Student <span className={classes.dash_header}>Directory</span></h1>
                                <p>Welcome,
                                    <span>
                                         {" " + this.props.student.biodata.surname} {this.props.student.biodata.firstname}
                                    </span>
                                </p>
                                {/*<p>Bachelor of Science in {this.state.student.credentials.course}</p>*/}
                            </header>

                            <Switch>
                                <Route path={this.props.match.url + "/view-biodata"} component={ViewBiodata} />
                                <Route path={this.props.match.url + "/update-biodata"} component={UpdateBiodata } />
                                <Route path={this.props.match.url + "/manage-courses"} component={ManageCourses} />
                                <Route path={this.props.match.url + "/logout"} component={Logout} />
                                <Route path={this.props.match.url + "/delete-account"} component={DeleteAccount} />
                                <Route path={this.props.match.url} component={DashboardIndex} />
                            </Switch>
                        </div>
                    </div>
                </div>
            );
        }

        else{
            return(
                <Spinner/>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        student: state.student,
        contentLoaded: state.dashboardLoaded
    };
};


const mapDispatchToProps = dispatch => {
    return {
        updateTheStudent: (route) => dispatch(theAction.updateTheStudent(route))

    };

};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);