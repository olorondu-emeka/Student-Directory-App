import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './DeleteAccount.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-instance';
import * as action from '../../../store/actions/index';

class DeleteAccount extends Component{

    state = {
        loading: false
    };

    deleteHandler = () => {
        this.setState({loading: true});
        axios.delete(`${this.props.match.url}/${this.props.studentID}`)
            .then(result => {
                //remove the token
                //and redirect to the login page

                this.setState({loading: false});


                //reset the redux state

                window.localStorage.removeItem('token');
                console.log(result.data.message);
                this.props.onAccountDelete();
                this.props.history.replace('/login');
            })
            .catch(error => {
                console.log(error);
            });
    };

    cancelDeleteHandler = () => {
        this.props.history.replace('/dashboard');
    };

    render(){
        if(this.state.loading){
            return <Spinner/>;
        }
        else{
            return (
                <div className={classes.deleteAccount}>
                    <p>Are you sure you want to delete this account?</p>
                    <div>
                        <button onClick={this.deleteHandler}>Yes</button>
                        <button onClick={this.cancelDeleteHandler}>No</button>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        studentID: state.student._id
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAccountDelete: () => dispatch(action.deleteAccount)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeleteAccount));