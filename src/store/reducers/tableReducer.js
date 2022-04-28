import {DIRECTION, NUMBER_OF_SHIPS} from '../../constants/ships';
import {
  INIT_CPU_BOARD,
  PLAYER_ATTACK,
  INIT_EMPTY_BOARD,
  UPDATE_PLAYER_BOARD,
  CPU_ATTACK,
  RESTART,
  RESTART_SAVED_PLAYER_SHIP
} from '../actions/action';
import Utils from '../../constants/Utils.js';

export const initialState = {
   cpuBoard: Utils.initBoard(),
   playerBoard: Utils.initBoard(),
  //cpuBoard: [],
  //playerBoard: [],
  shipsCpuCount: 0, // Total number of cpu ships without being destroyed
  shipsPlayerCount: 0, // Total number of player ships without being destroyed
  carriersAvailable: NUMBER_OF_SHIPS.CARRIER,
  cruisersAvailable: NUMBER_OF_SHIPS.CRUISER,
  submarinesAvailable: NUMBER_OF_SHIPS.SUBMARINE,
  updatedPlayerBoard: false,
  cpuCoordinatesAttacked: [], // positions of cpu attacks
  lastCpuHit: -1,
  lastCpuDirection: DIRECTION.UP,
  cpuShips: [], // Count of positions by ship without being hit.
  playerShips: [],
  savedPlayerShip: false,
  cpuHasTarget: false,
  attemptFeedback: '',
};

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CPU_BOARD:
    case CPU_ATTACK:
    case INIT_EMPTY_BOARD:
    case UPDATE_PLAYER_BOARD:
    case PLAYER_ATTACK:
      return {
        ...state,
        ...action.args
      }

    case RESTART:
      return {
        ...initialState
      }

    case RESTART_SAVED_PLAYER_SHIP:
      return {
        ...state,
        savedPlayerShip: false
      };
      default:
        return state;   
  }
}
