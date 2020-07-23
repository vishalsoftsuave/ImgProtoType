import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import ViewImage from './components/ViewImage'
import './App.css'
import {Link} from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Fragment>
        <Link to="/"><h1 align="center" style={{backgroundColor: "black", color: "white", margin: 0}}>Image Hotspot</h1></Link>
        <Switch>
          <Route exact path='/' component={WelcomePage}/>
          <Route exact path='/viewimage/:id' component={ViewImage}/>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
