import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from '../../axios-instance';
import Sidebar from '../../components/UI/Sidebar/Sidebar';
import ViewBiodata from './ViewBiodata/ViewBiodata';
import UpdateBiodata from './UpdateBiodata/UpdateBiodata';
import ManageCourses from './ManageCourses/ManageCourses';
import classes from './Dashboard.css';


class Dashboard extends Component{
    state = {
        student: {},
        contentLoaded: false,
    };

    tracker = 1;
    initialTracker = 1;
    componentUpdated = 0;

    componentDidMount(){
        console.log('dashboard component mounted');
        axios.get(`/dashboard/${this.props.match.params.id}`)
            .then(result => {
                this.componentUpdated = 0;
                this.setState({ student: result.data.student, contentLoaded: true });
                this.tracker = 2;
                console.log('state set in dashboard mount', this.tracker);
            })
            .catch(err => {
                console.log(err);
            });
    }

     componentDidUpdate(){

        this.componentUpdated += 1;
         //console.log('dashboard component updated', this.componentUpdated);
        if((this.tracker > 1) && (this.initialTracker > 1)){
           if(this.componentUpdated < 2){
               axios.get(`/dashboard/${this.props.match.params.id}`)
                   .then(result => {
                       this.setState({ student: result.data.student, contentLoaded: true });
                       //console.log('state set in dashboard update', result.data.student);
                   })
                   .catch(err => {
                       console.log(err);
                   });
           }

           if (this.componentUpdated === 2){
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
                                <h1>Student Directory</h1>
                                <p>Welcome,
                                    <span>
                                        {this.state.student.biodata.surname} {this.state.student.biodata.firstname}
                                    </span>
                                </p>
                                <p>Bachelor of Science in {this.state.student.credentials.course}</p>
                            </header>
                            <div className={classes.welcome}>

                            </div>
                            <Switch>
                                <Route path={this.props.match.url + "/view-biodata"} render={() => <ViewBiodata theStudent={this.state.student} />}/>
                                <Route path={this.props.match.url + "/update-biodata"} render={() => <UpdateBiodata theStudent={this.state.student} />}/>}/>
                                <Route path={this.props.match.url + "/manage-courses"} component={ManageCourses} />
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

export default Dashboard;