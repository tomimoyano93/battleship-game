export const BOARD_SIZE = 10;

export const SHIP_TYPES_CARRIER = {
  name: 'Carrier',
  id: 1,
  size: 4
}

export const SHIP_TYPES_CRUISER = {
  name: 'Cruiser',
  id: 2,
  size: 3
}

export const SHIP_TYPES_SUBMARINE = {
  name: 'Submarine',
  id: 3,
  size: 2
}
export const SHIP_TYPES_ID = {
  CARRIER: 1,
  CRUISER: 2,
  SUBMARINE: 3
}
export const CELL_VALUE = {
  EMPTY: 0,
  MISS: 1,
  HIT: 2,
  DESTROY: 3
}

export const NUMBER_OF_SHIPS = {
  CARRIER: 1,
  CRUISER: 3,
  SUBMARINE: 1,
  FINAL:5,
}


export const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  RIGHT: 'right',
  LEFT: 'left'
}

export const SHIP_ORIENTATION = {
  HORIZONTAL: 0,
  VERTICAL: 1,
}