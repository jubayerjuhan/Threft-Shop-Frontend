import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import Store from './REDUX/Store.js';
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplete from 'react-alert-template-basic'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <AlertProvider template={AlertTemplete} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

