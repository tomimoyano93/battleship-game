import {
  INIT_CPU_BOARD,
  PLAYER_ATTACK,
  INIT_EMPTY_BOARD,
  UPDATE_PLAYER_BOARD,
  CPU_ATTACK,
  RESTART,
  RESTART_SAVED_PLAYER_SHIP
} from './action';
import {SHIP_TYPES_ID, NUMBER_OF_SHIPS} from '../../constants/ships';
import utils from '../../constants/Utils';

const initCpuBoard = () => {
  const {cpuBoard, cpuShips} = utils.cpuBoard();
  return {
    type: INIT_CPU_BOARD,
    args: {
      cpuBoard,
      cpuShips,
      shipsCount: NUMBER_OF_SHIPS.FINAL
    }
  };
};

const cpuAttack = (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const {
    playerBoard,
    cpuCoordinatesAttack,
    cpuDirection,
    cpuHit,
    playerShips,
    playerShipsDestroyed,
    cpuHasTarget
  } = utils.cpuAttack(boardState.playerBoard, boardState.cpuCoordinatesAttack, boardState.cpuDirection, boardState.cpuHit, boardState.playerShips, boardState.cpuHasTarget);

  const shipCount = playerShipsDestroyed
    ? boardState.shipsPlayerCount - 1
    : boardState.shipsPlayerCount;

  return dispatch({
    type: CPU_ATTACK,
    args: {
      playerBoard,
      cpuCoordinatesAttack,
      cpuDirection,
      cpuHit,
      playerShips,
      shipsPlayerCount: shipCount,
      updatedPlayerBoard: true,
      cpuHasTarget,
      attemptFeedback: undefined
    }
  });
};

const initPlayerBoard = () => {
  const playerBoard = utils.initBoard();
  return {type: INIT_EMPTY_BOARD, args: {
      playerBoard
    }};
};

const playerBoard = (shipData) => (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const code = boardState.shipsPlayerCount;
  const updatedPlayerBoard = utils.playerBoard(boardState.playerBoard, shipData, code);
  const {playerShips} = boardState;
  let args;

  if (updatedPlayerBoard) {
    const shipsPlayerCount = boardState.shipsPlayerCount + 1;
    let {carriersAvaialable} = boardState;
    let {cruisersAvaialable} = boardState;
    let {submarinesAvaialable} = boardState;
    playerShips.push(shipData.ship.size);

    switch (shipData.ship.id) {
      case SHIP_TYPES_ID.CARRIER:
        carriersAvaialable -= 1;
        break;
      case SHIP_TYPES_ID.CRUISER:
        cruisersAvaialable -= 1;
        break;
      case SHIP_TYPES_ID.SUBMARINE:
        submarinesAvaialable -= 1;
        break;
      default:
        break;
    }
    args = {
      playerBoard: updatedPlayerBoard,
      shipsPlayerCount,
      carriersAvaialable,
      cruisersAvaialable,
      submarinesAvaialable,
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
  const {board, hit, shipDestroyed} = utils.attack(boardState.cpuBoard, row, col, boardState.cpuShips);
  let {shipsCount} = boardState;
  const {cpuShips} = boardState;
  let attemptFeedback = 'Miss';
  if (hit) {
    const codeShip = boardState.cpuBoard[row][col].code;
    cpuShips[codeShip] -= 1;
    attemptFeedback = 'Hit';
  }
  if (shipDestroyed) {
    shipsCount -= 1;
    attemptFeedback = 'Destroy';
  }
  return dispatch({
    type: PLAYER_ATTACK,
    args: {
      cpuBoard: board,
      shipsCount,
      cpuShips,
      updatedPlayerBoard: false,
      attemptFeedback
    }
  });
};

const restart = () => ({type: RESTART});

const restartSavedPlayer = () => ({type: RESTART_SAVED_PLAYER_SHIP});

const tableAction = {
  initCpuBoard,
  cpuAttack,
  initPlayerBoard,
  playerBoard,
  playerAttack,
  restart,
  restartSavedPlayer
};

export default tableAction;