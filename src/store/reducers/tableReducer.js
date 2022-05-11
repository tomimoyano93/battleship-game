import {
  INIT_CPU_BOARD, PLAYER_ATTACK, INIT_EMPTY_BOARD, UPDATE_PLAYER_BOARD, CPU_ATTACK, RESTART, RESTART_SAVED_PLAYER_SHIP,
} from '../actions/action';
import { NUMBER_OF_SHIP, DIRECTION } from '../../constants/ships';
import helpers from '../../constants/Utils';

export const initialState = {
  cpuBoard: helpers.initEmptyBoard(),
  playerBoard: helpers.initEmptyBoard(),
  shipsCpuCount: 0,
  shipsPlayerCount: 0, 
  carriersAvailable: NUMBER_OF_SHIP.CARRIER,
  cruisersAvailable: NUMBER_OF_SHIP.CRUISER,
  submarinesAvailable: NUMBER_OF_SHIP.SUBMARINE,
  updatedPlayerBoard: false,
  cpuCoordinatesAttacked: [],
  lastCpuHit: -1,
  lastCpuDirection: DIRECTION.UP,
  cpuShips: [], 
  playerShips: [],
  savedPlayerShip: false,
  cpuHasTarget: false,
  attemptFeedback: undefined,
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CPU_BOARD:
    case CPU_ATTACK:
    case INIT_EMPTY_BOARD:
    case UPDATE_PLAYER_BOARD:
    case PLAYER_ATTACK:
      return { ...state, ...action.args };

    case RESTART:
      return { ...initialState };

    case RESTART_SAVED_PLAYER_SHIP:
      return { ...state, savedPlayerShip: false };
    default:
      return state;
  }
};
