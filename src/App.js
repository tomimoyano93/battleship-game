import {Provider} from 'react-redux';
import React from 'react';
import store from '../src/store/store';
import AplicationRouter from './connect';


function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <AplicationRouter/>  
      </Provider>
    </div>
  )
}

export default App;
