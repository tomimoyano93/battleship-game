import React from 'react';
import {CELL_ID_VALUE} from '../../constants/ships';
import {CellComponent} from './styles';

const Cells = (props) => {
  const {id, mark, showShip, onMouseHover, onClick} = props;

  const getCellColor = () => {
    if (mark) {
      return '#9C9B9A';
    }
    switch (id) {
      case CELL_ID_VALUE.DEFAULT:
        return 'white';
      case CELL_ID_VALUE.WATER:
        return '#0077B3';
      case CELL_ID_VALUE.HIT:
        return '#FF9933';
      case CELL_ID_VALUE.DESTROYED:
        return 'red';
      default:
        if (!showShip) {
          return 'grey';
        }
        return 'white';
    }
  };

  const handleOnClick = () => {
    if (!(id === CELL_ID_VALUE.WATER || id === CELL_ID_VALUE.HIT || id === CELL_ID_VALUE.DESTROYED)) {
      onClick();
    }
  };

  return (<CellComponent
    color={getCellColor()}
    onMouseOver={() => onMouseHover()}
    onClick={() => handleOnClick()}/>);
};

Cells.defaultProps = {
  mark: false
};

export default Cells;
