import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import ApplicationRouter from './connect';
import './App.css';

const App = () => (
  <div className="App">
    <Provider store={store}>
      <ApplicationRouter/>
    </Provider>
  </div>
);

export default App;
