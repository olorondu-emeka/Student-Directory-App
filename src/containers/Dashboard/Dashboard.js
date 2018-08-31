import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from '../../components/UI/Sidebar/Sidebar';
import ViewBiodata from './ViewBiodata/ViewBiodata';
import UpdateBiodata from './UpdateBiodata/UpdateBiodata';
import ManageCourses from './ManageCourses/ManageCourses';
import DashboardIndex from './Dashboard_Index/Dashboard_index';
import Logout from '../Logout/Logout';
import classes from './Dashboard.css';
import { connect } from 'react-redux';
import TheAxios from "axios";
import  * as  theAction from '../../store/actions/index';


class Dashboard extends Component{

    componentWillMount(){
        const theToken = window.localStorage.getItem('token');
        if (theToken !== null){
            //set header
           this.getToken(theToken);
            //this.props.updateTheStudent(`/dashboard/${this.props.match.params.id}`);

        }
        else{
            this.props.history.replace('/login');
        }
    }

    // componentWillReceiveProps(nextProps){
    //     if (this.props.student !== nextProps.student){
    //         this.setState({student: nextProps.student});
    //     }
    // }


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



    componentDidMount(){
        this.props.updateTheStudent(`/dashboard/${this.props.match.params.id}`);
    }

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
                                <Route path={this.props.match.url} component={DashboardIndex} />
                            </Switch>
                        </div>
                    </div>
                </div>
            );
        }

        else{
            return(
                <p>Loading</p>
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