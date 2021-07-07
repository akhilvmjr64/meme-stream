import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Memes from './memes'
import Form from './form'
import Edit from './edit'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
function NotFound(props) {
  return (<div className="error-parent"><div className="error">
      <h1>
        404 - Page Not Found
      </h1>
      You will be redirected to home page...
    </div>
    {setTimeout(()=>{props.history.push("/")},2000)}
  </div>)  
}

ReactDOM.render(
  <React.StrictMode>
  <Router>
    <Switch>
      <Route path='/' exact component={Memes} />
      <Route path="/entry" exact component={Form}/>
      <Route path="/edit" exact component={Edit}/>
      <Route path="*" exact component={NotFound}/>
    </Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();