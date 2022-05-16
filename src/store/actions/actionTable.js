import {
  INIT_CPU_BOARD,
  PLAYER_ATTACK,
  INIT_EMPTY_BOARD,
  UPDATE_PLAYER_BOARD,
  CPU_ATTACK,
  RESTART,
  RESTART_SAVED_PLAYER_SHIP
} from './action';
import {SHIP_TYPE_ID, NUMBER_OF_SHIP} from '../../constants/ships';
import Utils from '../../constants/Utils';

const initCpuBoard = () => {
  const {cpuBoard, cpuShips} = Utils.initRandomCpuBoard();
  return {
    type: INIT_CPU_BOARD,
    args: {
      cpuBoard,
      cpuShips,
      shipsCpuCount: NUMBER_OF_SHIP.TOTAL
    }
  };
};

const cpuAttack = () => (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const {
    playerBoard,
    cpuCoordinatesAttacked,
    lastCpuDirection,
    lastCpuHit,
    playerShips,
    playerShipDestroyed,
    cpuHasTarget
  } = Utils.cpuAttack(boardState.playerBoard, boardState.cpuCoordinatesAttacked, boardState.lastCpuDirection, boardState.lastCpuHit, boardState.playerShips, boardState.cpuHasTarget);
  const shipsCount = playerShipDestroyed
    ? boardState.shipsPlayerCount - 1
    : boardState.shipsPlayerCount;

  return dispatch({
    type: CPU_ATTACK,
    args: {
      playerBoard,
      cpuCoordinatesAttacked,
      lastCpuDirection,
      lastCpuHit,
      playerShips,
      shipsPlayerCount: shipsCount,
      updatedPlayerBoard: true,
      cpuHasTarget,
      attemptFeedback: undefined
    }
  });
};

const initEmptyBoard = () => {
  const playerBoard = Utils.initEmptyBoard();
  return {type: INIT_EMPTY_BOARD, args: {
      playerBoard
    }};
};

const updatePlayerBoard = (shipData) => (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const code = boardState.shipsPlayerCount;
  const updatedPlayerBoard = Utils.updatePlayerBoard(boardState.playerBoard, shipData, code);
  const {playerShips} = boardState;
  let args;

  if (updatedPlayerBoard) {
    const shipsPlayerCount = boardState.shipsPlayerCount + 1;
    let {carriersAvailable} = boardState;
    let {cruisersAvailable} = boardState;
    let {submarinesAvailable} = boardState;
    playerShips.push(shipData.ship.size);

    switch (shipData.ship.id) {
      case SHIP_TYPE_ID.CARRIER:
        carriersAvailable -= 1;
        break;
      case SHIP_TYPE_ID.CRUISER:
        cruisersAvailable -= 1;
        break;
      case SHIP_TYPE_ID.SUBMARINE:
        submarinesAvailable -= 1;
        break;
      default:
        break;
    }
    args = {
      playerBoard: updatedPlayerBoard,
      shipsPlayerCount,
      carriersAvailable,
      cruisersAvailable,
      submarinesAvailable,
      playerShips,
      savedPlayerShip: true
    };
  } else {
    args = {
      savedPlayerShip: false
    };
  }
  return dispatch({type: UPDATE_PLAYER_BOARD, args});
};

const playerAttack = ({row, col}) => (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const {board, hit, shipDestroyed} = Utils.attack(boardState.cpuBoard, row, col, boardState.cpuShips);
  let {shipsCpuCount} = boardState;
  const {cpuShips} = boardState;
  let attemptFeedback = 'Shot missed!';
  if (hit) {
    const codeShip = boardState.cpuBoard[row][col].code;
    cpuShips[codeShip] -= 1;
    attemptFeedback = 'Ship hit!';
  }
  if (shipDestroyed) {
    shipsCpuCount -= 1;
    attemptFeedback = 'Ship destroyed!';
  }
  return dispatch({
    type: PLAYER_ATTACK,
    args: {
      cpuBoard: board,
      shipsCpuCount,
      cpuShips,
      updatedPlayerBoard: false,
      attemptFeedback
    }
  });
};

const restart = () => ({type: RESTART});

const restartSavedPlayerShip = () => ({type: RESTART_SAVED_PLAYER_SHIP});

const BoardActions = {
  initCpuBoard,
  cpuAttack,
  initEmptyBoard,
  updatePlayerBoard,
  playerAttack,
  restart,
  restartSavedPlayerShip
};

export default BoardActions;
