//Default imports from the create-react-app initialization
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

//CSS Import(s)
import './css/Custom.css'

//Imports from module
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers/reducer';
import thunk from 'redux-thunk';

//Imports from custom js file components
import BaseLayout from './components/BaseLayout';
import MakePlan from './components/MakePlan';
import Login from './components/Login';
import Register from './components/Register';
import Planner from './components/Planner';
import PlanSize from './components/PlanSize';
import Profile from './components/Profile';
import requireAuth from './components/requireAuth';

// Importing and set axios header for authorization on serviceWorker
import { setAuthHeader } from './utils/authenticate';

//Creating Redux Store with redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
  ));

setAuthHeader(localStorage.getItem('jsonwebtoken'));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/make-garden" component={requireAuth(MakePlan)} />
          <Route path="/login" component={Login} />
          <Route path="/plan-size" component={requireAuth(PlanSize)} />
          <Route path="/plan/new" component={requireAuth(Planner)} />
          <Route path="/register" component={Register} />
          <Route path="/plan/:planId" component={requireAuth(Planner)} />
          <Route path="/profile/:userId" component={requireAuth(Profile)} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
