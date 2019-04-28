//Default imports from the create-react-app initialization
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//CSS Import(s)
import './Custom.css'

//Import(s) from module
import {BrowserRouter, Switch, Route} from 'react-router-dom'

//Imports from custom js file components
import {BaseLayout} from './components/BaseLayout'



ReactDOM.render(
  <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/make-garden" exact component={App} />
        <Route path="/login" exact component={App} />
      </Switch>
    </BaseLayout>
  </BrowserRouter>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
