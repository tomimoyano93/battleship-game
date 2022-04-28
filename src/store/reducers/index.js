import { combineReducers } from 'redux';
import { tableReducer } from './tableReducer';
import { gameReducer } from './gameReducer';

const applicationReducer = combineReducers({
    table: tableReducer,
    game: gameReducer,
});

export default applicationReducer;