import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import { Provider } from 'react-redux';
import Students from './components/Students';
import Subjects from './components/Subjects';
import Home from './components/Home';
import actions from './reducers/actions';
import students from './reducers/students';
import Student from './components/Student';
import 'bulma/css/bulma.css';



const rootReducer = combineReducers({ actions, students });
const store = createStore(rootReducer, applyMiddleware(thunk, createMiddleware()));
const rootEl = document.getElementById('root');

const render = () => ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/students" component={Students} />
        <Route exact path="/subjects" component={Subjects} />
        <Route exact path="/students/:id" component={(routerProps) =>
          <Student id={routerProps.match.params.id} />} />
      </Switch>
    </Router>
  </Provider>
  , rootEl
);

render();
store.subscribe(render);
