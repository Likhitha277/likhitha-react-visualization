/* eslint-disable quotes */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {
  Provider, createClient, defaultExchanges,
} from 'urql';
import App from './App';
// import reportWebVitals from './reportWebVitals';

// For processing the operations & their results
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
  ],
});

// Provider:To allow our React-tree to access the client.
ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
