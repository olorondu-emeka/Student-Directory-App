import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import classes from './App.css';
import { faHome, faUser, faUserEdit, faClipboardList, faTrash, faSignOutAlt, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faHome, faUser, faUserEdit, faClipboardList, faTrash, faSignOutAlt, faPlus, faEye);


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className={classes.App}>
              <Switch>
                  <Route path="/register" component={Register}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/dashboard/:id" component={Dashboard}/>
                  <Route path="/" component={Home} />
              </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
