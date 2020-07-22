import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import ViewImage from './components/ViewImage'
const App = () => {
  return (
    <Router>
      <Fragment>
        <h1 align="center" style={{backgroundColor: "black", color: "white", margin: 0}}>Image Hotspot</h1>
        <Switch>
          <Route exact path='/' component={WelcomePage}/>
          <Route exact path='/viewimage' component={ViewImage}/>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
