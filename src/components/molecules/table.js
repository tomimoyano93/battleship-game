import React, {useState} from 'react';
import Utils from '../../constants/Utils';
import Cells from './cells';


const Table = (props) => {
  const {
    cpu,
    click,
    board,
    shipSelected,
    shipOrientation,
    onClickBoard
  } = props;
  const [positionsToMark,
    setPositionsToMark] = useState([]);

  const markPositions = (row, col) => {
    setPositionsToMark([]);
    if (shipSelected) {
      const positions = Utils.getShipPositions(board, shipSelected.size, row, col, shipOrientation);
      if (positions) {
        setPositionsToMark(positions);
      } else {
        setPositionsToMark([]);
      }
    }
  };

  const handleOnClick = (x, y) => {
    if (click) {
      onClickBoard({row: x, col: y});
    }
  };

  const getBoard = () => {
    let mark;
    const updatedBoard = board.map((row, x) => (
      <div key={x.toString()} className="row">
        {row.map((column, y) => {
          mark = positionsToMark.length > 0 && positionsToMark.findIndex((pos) => pos.row === x && pos.col === y) !== -1;
          return (
            <div key={y.toString()}>
              <Cells
                showShip={cpu}
                code={board[x][y].code}
                id={board[x][y].id}
                onMouseHover={() => markPositions(x, y)}
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
    <div className='container1'>
      {getBoard()}
    </div>
  );
};

Table.defaultProps = {
  shipSelected: null,
  shipOrientation: null,
  onClickBoard: () => {}
};

export default Table;
