import React, { Component } from 'react';
import Header from '../../components/UI/Header/Header';
import theImage from '../../images/students2.png';
import classes from './Home.css';

class Home extends Component{
    render(){
        return(
            <div className={classes.Home}>
                <Header/>
                <div className={classes.container}>
                    <div className={classes.text_contain}>
                        <p className={classes.welcome}>Welcome to the Student Directory App</p>
                        <p className={classes.sub}>Manage your courses, add & delete courses, update your biodata and so
                            much more!</p>
                    </div>
                    <div className={classes.imageContain}>
                        <img src={theImage} alt="the person"/>
                    </div>
                </div>
                {/*<footer>*/}
                    {/*<p>Built by Olorondu Emeka</p>*/}
                {/*</footer>*/}
            </div>
        );
    }
}

export default Home;