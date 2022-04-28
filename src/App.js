import {Provider} from 'react-redux';
import React from 'react';
import store from '../src/store/store';
import ApplicationRouter from './connect';
import './App.css';


function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <ApplicationRouter/>  
      </Provider>
    </div>
  )
}

export default App;
