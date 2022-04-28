import { getDefaultNormalizer } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import applicationReducer from './reducers/index';

const store = createStore(applicationReducer, applyMiddleware(thunk));

export default store;