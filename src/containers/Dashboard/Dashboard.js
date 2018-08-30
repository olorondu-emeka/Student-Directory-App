import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from '../../axios-instance';
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
    state = {
        contentLoaded: false
    };

    tracker = 1;
    initialTracker = 1;
    componentUpdated = 0;

    componentWillMount(){
        const theToken = window.localStorage.getItem('token');
        if (theToken !== null){
            //set header
           this.getToken(theToken);
        }
        else{
            this.props.history.replace('/login');
        }
    }


    getToken  (token){

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
        console.log('dashboard component mounted');
        // const tokenValue = window.localStorage.getItem('token');
        // console.log(tokenValue);

        //get token value from redux store and store it in the axios header
        //this.getToken(tokenValue);
        axios.get(`/dashboard/${this.props.match.params.id}`)
            .then(result => {
                this.componentUpdated = 0;

                //update student in the redux store
                this.props.updateStudent(result.data.student);

                this.setState({ contentLoaded: true });
                this.tracker = 2;
                console.log('state set in dashboard mount', result);
            })
            .catch(err => {
                console.log(err);
            });


    }

     componentDidUpdate(){

        this.componentUpdated += 1;
         console.log('dashboard component updated', this.componentUpdated);
        if((this.tracker > 1) && (this.initialTracker > 1)){
           if(this.componentUpdated < 2){
               axios.get(`/dashboard/${this.props.match.params.id}`)
                   .then(result => {
                       //update student in the redux store
                       this.props.updateStudent(result.data.student);

                       console.log(result, "dashboard component updated get");
                   })
                   .catch(err => {
                       console.log(err);
                   });
           }

           if (this.componentUpdated === 3){
               this.componentUpdated = 0;
           }
        }//end outer if

        this.initialTracker = 2;

        //console.log('end of dashboard component updated');
    }


    render() {
        if (this.state.contentLoaded) {
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
                                <Route path={this.props.match.url + "/logout"} render={() => <Logout logoutUser={this.props.logout} />} />
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
        student: state.student
    };
};


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(theAction.logoutUser()),
        updateStudent: (theStudent) => dispatch(theAction.updateStudent(theStudent))
    };

};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);