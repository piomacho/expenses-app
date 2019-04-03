import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import appState from './stores/expensesStore';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { PageInfo } from './components/PageInfo';
import { NavigationBar } from './NavigationBar';

const routing = (
  <Router>
    <Provider ExpensesStore={appState}>
      <div>
        <NavigationBar />
        <Route path="/expenses" component={App} />
        <Route exact path="/" component={PageInfo} />
      </div>
    </Provider>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
