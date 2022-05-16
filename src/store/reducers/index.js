import {combineReducers} from 'redux';
import {boardReducer} from './tableReducer';
import {gameReducer} from './gameReducer';

const applicationReducer = combineReducers({board: boardReducer, game: gameReducer});

export default applicationReducer;