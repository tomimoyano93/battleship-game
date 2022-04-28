import { combineReducers } from 'redux';
import { tableReducer } from './tableReducer';
import { gameReducer } from './gameReducer';

const aplicationReducer = combineReducers({
    table: tableReducer,
    game: gameReducer,
});

export default aplicationReducer;