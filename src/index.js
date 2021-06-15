import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={App} />
          __ROUTE_INIT__TARGET
          <Route path="*" component={App} />
        </Switch>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
