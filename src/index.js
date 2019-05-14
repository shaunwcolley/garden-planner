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
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers/reducer'

//Imports from custom js file components
import {BaseLayout} from './components/BaseLayout'
import {MakePlan} from './components/MakePlan'
import {Login} from './components/Login'
import Planner from './components/Planner'
import PlanSize from './components/PlanSize'


//Creating Redux Store
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/make-garden" component={MakePlan} />
          <Route path="/login" component={Login} />
          <Route path="/plan-size" component={PlanSize} />
          <Route path="/planner" component={Planner} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>



  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
