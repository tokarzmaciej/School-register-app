import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'


// const rootReducer = combineReducers({ })
// const store = createStore()
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  // <Provider store={store}>
  <App />
  // </Provider>
  , rootEl
)
render()
// store.subscribe(render)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

