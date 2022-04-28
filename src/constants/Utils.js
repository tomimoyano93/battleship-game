import {
  CELL_VALUE,
  DIRECTION,
  NUMBER_OF_SHIPS,
  SHIP_ORIENTATION,
  SHIP_TYPES_CARRIER,
  SHIP_TYPES_CRUISER,
  SHIP_TYPES_SUBMARINE,
  BOARD_SIZE
} from './ships';

export {
  SHIP_TYPES_CARRIER,
  SHIP_TYPES_CRUISER,
  SHIP_TYPES_SUBMARINE,
  SHIP_TYPES_ID,
  CELL_VALUE,
  NUMBER_OF_SHIPS,
  SHIP_ORIENTATION,
  DIRECTION
}
from './ships';

const initBoard = () => {
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push({id: CELL_VALUE.EMPTY, code: -1});
    }
    board.push(row);
  }
  return board;
}

const validPosition = (row, col) => {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

const emptyPosition = (row, col, board) => {
  if (validPosition(row, col) && board[row][col].id === CELL_VALUE.EMPTY) {
    return true;
  }
  return false;
};

const getNeighbors = (row, col, board) => {
  if (validPosition(row, col) && board[row][col].id === CELL_VALUE.EMPTY) {
    return false;
  }
  return true;
};

const positionShip = (row, col, board) => {
  if (emptyPosition(row, col, board) && getNeighbors(row - 1, col, board) && getNeighbors(row + 1, col, board) && getNeighbors(row, col - 1, board) && getNeighbors(row, col + 1, board)) {
    return true;
  }
  return false;
};

const getShip = (board, shipSize, row, col, orientation) => {
  const positions = [];
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    for (let y = 0; y < shipSize; y++) {
      if (positionShip(row, col + y, board)) {
        positions.push({
          row,
          col: col + y
        });
      } else 
        return null;
      }
    } else {
    for (let x = 0; x < shipSize; x++) {
      if (freePositionToSaveShip(row - x, col, board)) {
        positions.push({
          row: row - x,
          col
        });
      } else 
        return null;
      }
    }
  return positions;
};

const freePositionToSaveShip = (row, col, board, shipSize, orientation) => {
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    for (let y = 0; y < shipSize; y++) {
      if (positionShip(row, col + y, board)) {
        return false;
      }
    }
  } else {
    for (let x = 0; x < shipSize; x++) {
      if (!positionShip(row - x, col, board)) {
        return false;
      }
    }
  }
  return true;
};

const saveShip = (board, ship, size, row, col, orientation) => {
  let updateBoard = board.slice(0);
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    for (let y = 0; y < size; y++) {
      updateBoard[row][col + y] = ship;
    }
  } else {
    for (let x = 0; x < size; x++) {
      updateBoard[row - x][col] = ship;
    }
  }
  return updateBoard;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createShips = () => {
  const carrier = Array.from({
    length: NUMBER_OF_SHIPS.CARRIER
  }, (_, index) => ({
    ...SHIP_TYPES_CARRIER,
    ...{
      code: index
    }
  }));
  const cruiser = Array.from({
    length: NUMBER_OF_SHIPS.CRUISER
  }, (_, index) => ({
    ...SHIP_TYPES_CRUISER,
    ...{
      code: index + NUMBER_OF_SHIPS.CARRIER
    }
  }));
  const submarine = Array.from({
    length: NUMBER_OF_SHIPS.SUBMARINE
  }, (_, index) => ({
    ...SHIP_TYPES_SUBMARINE,
    ...{
      code: index + NUMBER_OF_SHIPS.CARRIER + NUMBER_OF_SHIPS.CRUISER
    }
  }));
  return [
    ...carrier,
    ...cruiser,
    ...submarine
  ];
};

const getRandomDirection = () => {
  if (getRandomInt(1, 2) === 1) {
    return SHIP_ORIENTATION.HORIZONTAL;
  } return SHIP_ORIENTATION.VERTICAL;
};

const getRandomCoordinates = () => {
  getRandomInt(0, BOARD_SIZE);
}

const cpuBoard = () => {
  const enemyShips = [];
  const ships = createShips();
  let cpuBoard = initBoard();
  let index = 0;
  let row;
  let col;
  let orientation;
  let emptyPosition;
  let ship;

  while (index < NUMBER_OF_SHIPS.FINAL) {
    row = getRandomCoordinates();
    col = getRandomCoordinates();
    orientation = getRandomDirection();
    emptyPosition = freePositionToSaveShip(row, col, cpuBoard, ships[index].size, orientation);

    if (emptyPosition) {
      ship = {
        id: ships[index].id,
        code: ships[index].code,
        size: ships[index].size,
        orientation
      };
      cpuBoard = saveShip(cpuBoard, ship, ship.size, row, col, orientation);
      enemyShips[ships[index].code] = ship.size;
      index += 1;

    }
  }
  return {cpuBoard, enemyShips}
};

const playerBoard = (board, shipData, code) => {
  const {row, col, orientation, ship} = shipData;
  const emptyPosition = freePositionToSaveShip(row, col, board, ship.size, orientation);
  if (emptyPosition) {
    return saveShip(board, {
      id: ship.id,
      code,
      orientation
    }, ship.size, row, col, orientation);
  }
  return null;
};

const updateShipToDestroyed = (board, code) => board.map((row, x) => (row.map((column, y) => {
  if (board[x][y].code === code) {
    return {id: CELL_VALUE.DESTROY, code};
  };
  return board[x][y];
})));

const attack = (board, row, col, countShips) => {
  const {id, code, orientation} = board[row][col];
  let updateBoard = board.slice(0);
  let shipDestroyed = false;
  if (id === CELL_VALUE.DESTROY || id === CELL_VALUE.MISS) {
    updateBoard[row][col] = {
      id: CELL_VALUE.MISS,
      code
    };
    return {board: updateBoard, hit: false, shipDestroyed};
  }
  if (id != CELL_VALUE.DESTROY) {
    if ((countShips[code] - 1) === 0) {
      updateBoard = updateShipToDestroyed(board, code);
      shipDestroyed = true;
    } else {
      updateBoard[row][col] = {
        id: CELL_VALUE.HIT,
        orientation,
        code,
        shipId: id
      };
    }
  }
  return {board: updateBoard, hit: true, shipDestroyed};
};

const validPositionAttack = (playerBoard, position) => (validPosition(position.row, position.col) && playerBoard[position.row][position.col].id !== CELL_VALUE.MISS);

const changePositionAttack = (playerBoard, orientation, cpuHit, hitNumber, cpuDirection) => {
  let position;
  let direction;
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    if (cpuDirection === DIRECTION.RIGHT) {
      position = {
        row: cpuHit.row,
        col: cpuHit.col - hitNumber,
        direction: DIRECTION.LEFT
      };
      direction = DIRECTION.UP;

    } else {
      position = {
        row: cpuHit.row,
        col: cpuHit.col + hitNumber,
        direction: DIRECTION.RIGHT
      };
      direction = DIRECTION.DOWN;
    }
  } else if (cpuDirection === DIRECTION.UP) {
    position = {
      row: cpuHit.row + hitNumber,
      col: cpuHit.col,
      direction: DIRECTION.DOWN
    };
    direction = DIRECTION.RIGHT;
  } else {
    position = {
      row: cpuHit.row - hitNumber,
      col: cpuHit.col,
      direction: DIRECTION.UP
    };
    direction = DIRECTION.LEFT;
  }
  if (validPositionAttack(playerBoard, position)) {
    return {position, direction};
  }
  return {row: cpuHit.row, col: cpuHit.col, direction: direction};
};

const nextMove = (cpuHit, cpuDirection) => {
  let position;
  switch (cpuDirection) {
    case DIRECTION.UP:
      position = {
        row: cpuHit.row,
        col: cpuHit.col + 1,
        direction: DIRECTION.RIGHT
      };
      break;
    case DIRECTION.DOWN:
      position = {
        row: cpuHit.row,
        col: cpuHit.col - 1,
        direction: DIRECTION.LEFT
      };
      break;
    case DIRECTION.LEFT:
      position = {
        row: cpuHit.row - 1,
        col: cpuHit.col,
        direction: DIRECTION.UP
      };
      break;
    case DIRECTION.RIGHT:
      position = {
        row: cpuHit.row + 1,
        col: cpuHit.col,
        direction: DIRECTION.DOWN
      };
      break;
    default:
      break;
  }
  return position;
};

const directionAttack = (playerBoard, orientation, cpuHit, cpuDirection, hitNumber) => {
  let position;
  let direction = cpuDirection;
  do {
    position = nextMove(cpuHit, direction);
    direction = position.direction
  } while (!validPositionAttack(playerBoard, position));
  return position;
};

const nextPosition = (cpuHit, playerBoard, orientation, hitNumber, cpuDirection) => {
  let position;
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    if (cpuDirection === DIRECTION.RIGHT) {
      position = {
        row: cpuHit.row,
        col: cpuHit.col + 1,
        direction: DIRECTION.RIGHT
      };
    } else {
      position = {
        row: cpuHit.row,
        col: cpuHit.col - 1,
        direction: DIRECTION.LEFT
      };
    }
  } else if (cpuDirection === DIRECTION.UP) {
    position = {
      row: cpuHit.row - 1,
      col: cpuHit.col,
      direction: DIRECTION.UP
    };
  } else {
    position = {
      row: cpuHit.row + 1,
      col: cpuHit.col,
      direction: DIRECTION.DOWN
    };
  }
  if (validPositionAttack(playerBoard, position)) {
    return position;
  }
  return changePositionAttack(playerBoard, orientation, cpuHit, hitNumber, cpuDirection);
};

const cpuAttackPosition = (board, size, shipToHit, orientation, cpuHit, cpuDirection, cpuHasTarget) => {
  const numberOfHits = size - shipToHit;
  if (numberOfHits > 1) {
    if (cpuHasTarget) {
      return directionAttack(board, orientation, cpuHit, cpuDirection, numberOfHits);
    }
    return changePositionAttack(board, orientation, cpuHit, numberOfHits, cpuDirection);
  }
  return directionAttack(board, cpuHit, cpuDirection);
};

const getShipSize = (id) => {
  let size;
  switch (id) {
    case SHIP_TYPES_CARRIER.id:
      size = SHIP_TYPES_CARRIER.size;
      break;
    case SHIP_TYPES_CRUISER.id:
      size = SHIP_TYPES_CRUISER.size;
      break;
    case SHIP_TYPES_SUBMARINE.id:
      size = SHIP_TYPES_SUBMARINE.size;
      break;
    default:
      break;
  }
  return size;
}

const randomBoarPosition = (playerBoard, cpuDirection) => {
  let row;
  let col;
  let cellId;
  let valid = false;
  while (!valid) {
    row = getRandomCoordinates();
    col = getRandomCoordinates();
    cellId = playerBoard[row][col].id;
    if (cellId !== CELL_VALUE.MISS && cellId !== CELL_VALUE.HIT && CELL_VALUE.DESTROY) {
      valid = true;
    }
  }
  return {row, col, direction: cpuDirection};
};

const cpuAttack = (playerBoard, cpuCoordinatesAttack, cpuDirection, cpuHit, playerShips, cpuHasTarget) => {
  let attackPosition;
  let cpuCoordinates = cpuCoordinatesAttack.slice(0);
  let ships = playerShips.slice(0);
  let lastDir = cpuDirection
  let positionAttack = false;
  let lastHit = cpuHit;
  let cpuTarget = cpuHasTarget;

  do {
    if (cpuHit === -1) {
      attackPosition = randomBoarPosition(playerBoard, lastDir);
    } else {
      const ship = playerBoard[cpuHit.row][cpuHit.col];
      attackPosition = cpuAttackPosition(playerBoard, getShipSize(ship.id), playerShips[ship.code], ship.orientation, cpuHit, lastDir, cpuTarget);
    }
    const {row, col, direction} = attackPosition;
    positionAttack = cpuCoordinatesAttack.some((coordinate) => coordinate.row === row && coordinate.col === col);
    lastDir = direction;
  } while (positionAttack);

  const position = {
    row: attackPosition.row,
    col: attackPosition.col
  };
  const {code} = playerBoard[position.row][position.col];
  const {board, hit, shipDestroyed} = attack(playerBoard, position.row, position.col, playerShips);
  cpuCoordinates.push(position);

  if (shipDestroyed) {
    lastHit = -1;
    cpuTarget = false;
  } else if (hit) {
    ships[code]--;
    lastHit = position;
    cpuTarget = true;
  } else {
    cpuTarget = false;
  }

  return {
    playerBoard: board,
    cpuCoordinatesAttack: cpuCoordinates,
    cpuDirection: lastDir,
    cpuHit: lastHit,
    playerShips: ships,
    playerShipsDestroyed: shipDestroyed,
    cpuHasTarget: cpuTarget
  };
};

const Utils = {
  initBoard,
  getShip,
  cpuBoard,
  playerBoard,
  cpuAttack,
  attack
}

export default Utils;