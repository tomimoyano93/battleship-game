import React from "react";
import PropTypes from "prop-types";
import {CELL_VALUE} from "../../constants/ships";

const Cells = (props) => {
  const {id, mark, ship, onClick, onMouseOver} = props;

  const cellColor = () => {
    if (mark) {
      return '9C9B9A';
    }
    switch (id) {
      case CELL_VALUE.EMPTY:
        return 'grey';
      case CELL_VALUE.MISS:
        return 'blue';
      case CELL_VALUE.HIT:
        return 'orange';
      case CELL_VALUE.DESTROY:
        return 'red';
      default:
        if (!ship) {
          return 'grey';
        }
        return 'white';
    }
  };

  const handleOnClick = () => {
      if (!(id === CELL_VALUE.MISS || id === CELL_VALUE.HIT || id === CELL_VALUE.DESTROY)) {
        onClick();
      }
  };

  return(
      <div color ={cellColor()} onMouseOver={()=>onMouseOver()} onClick={()=>handleOnClick()} className="cell"/>
  );
};

Cells.propTypes = {
    id: PropTypes.number.isRequired,
    mark: PropTypes.bool.isRequired,
    ship: PropTypes.bool.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

Cells.defaultProps = {
    mark:false,
}

export default Cells;