import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import {myHistory} from './app/customRouter/history';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={myHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
