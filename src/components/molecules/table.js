import React, {useState} from "react";
import PropTypes from "prop-types";
import Utils from "../../constants/Utils";
import Cells from "./cells";

const Table = (props) => {
  const {
    cpu,
    click,
    table,
    ships,
    shipOrientation,
    onClickBoard
  } = props;
  const [positionToMark,
    setPositionToMark] = useState([]);

  const markPosition = (row, col) => {
    setPositionToMark([]);
    if (ships) {
      const position = Utils.getPosition(table, ships.size, row, col, shipOrientation);
      if (position) {
        setPositionToMark(position);
      } else {
        setPositionToMark([]);
      }
    }
  };

  const handleOnClick = (x, y) => {
    if (click) {
      onClickBoard({row: x, col: y});
    }
  };

  const getTable = () => {
    let mark;
    const updatedBoard = table.map((row, x) => (
      <div key={x.toString()} className="row">
        {row.map((column, y) => {
          mark = positionToMark.length > 0 && positionToMark.findIndex((pos) => pos.row === x && pos.col === y) !== -1;
          return (
            <div key={y.toString()}>
              <Cells
                showShip={cpu}
                code={table[x][y].code}
                id={table[x][y].id}
                onMouseHover={() => markPosition(x, y)}
                mark={mark}
                onClick={() => handleOnClick(x, y)}/>
            </div>
          );
        })}
      </div>
    ));
    return updatedBoard;
  };

  return (
    <div className="container1">
      {getTable()}
    </div>
  );
};

Table.propTypes = {
    cpu: PropTypes.bool.isRequired,
    click: PropTypes.bool.isRequired,
    table: PropTypes
    .arrayOf(PropTypes.array.isRequired)
    .isRequired,
    ships: PropTypes.element,
    shipOrientation: PropTypes.number,
    onClickBoard: PropTypes.func,
};

Table.defaultProps = {
    ships: null,
    table: [],
    shipOrientation: null,
    onClickBoard: () => {},
}

export default Table;