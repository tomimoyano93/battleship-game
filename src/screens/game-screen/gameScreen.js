import React, {useEffect, useState} from "react";
import {Link, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import ActionGames from "../../store/actions/actionGames";
import tableAction from "../../store/actions/actionTable";
import Nav from "../start-screen/nav";
import Table from "../../components/molecules/table";
import ShipsTouch from "../../components/molecules/shipsTouch";

const GameScreen = (props) => {
  const {
    playerBoard,
    cpuBoard,
    updatedPlayerBoard,
    shipsCpuCount,
    shipsPlayerCount,
    attemptFeedback,
    playerName,
    currentPlayer,
    initCpuBoard,
    playerAttack,
    cpuAttack,
    updateCurrentPlayer,
    updateWinner
  } = props;
  const [finishGame,
    setFinishGame] = useState(false);
  const checkWinner = () => {
    if (shipsCpuCount === 0) {
      updateWinner(playerName);
      setFinishGame(true);
    }

    if (shipsPlayerCount === 0) {
      updateWinner('CPU');
      setFinishGame(true);
    }
  };

  const setTurn = () => {
    checkWinner();
    updateCurrentPlayer();
  };

  useEffect(() => {
    initCpuBoard();
    updateCurrentPlayer();
  }, [initCpuBoard, updateCurrentPlayer]);

  useEffect(() => {
    const changeTurn = () => {
      const timer = setTimeout(setTurn, 1000);
      return () => clearTimeout(timer);
    };

    if (currentPlayer === 'CPU' && !updatedPlayerBoard) {
      cpuAttack();
    }

    if (updatedPlayerBoard && currentPlayer === 'CPU') {
      changeTurn();
    }
  }, [currentPlayer, updatedPlayerBoard]);

  const handleClickBoard = (position) => {
    if (currentPlayer !== 'CPU') {
      playerAttack(position);
      setTimeout(setTurn, 1000);
    }
  };
  const renderContent = () => (finishGame
    ? <Route to="/end" push/>
    : (
      <div>
        <Route>
          <div style={{
            flexDirection: 'column'
          }}>
            <div style={{
              paddingBottom: 10
            }}>
              <p>{playerName}</p>
            </div>
            <Table cpu={false} click={false} table={playerBoard}/>
          </div>
          <Route>
            <div style={{
              paddingBottom: 10
            }}>
              <p>CPU</p>
            </div>
            <Table
              cpu
              click
              board={cpuBoard}
              onClickBoard={(position) => handleClickBoard(position)}/>
          </Route>
        </Route>
        <div>
          <div>
            <p size="1.4em">
              {attemptFeedback}
            </p>
          </div>
          <div>
            <p size="1.4em">
              Playing: {' '}
              {currentPlayer}
            </p>
            <Link to="/end">
              <div>
                Surrender
              </div>
            </Link>
          </div>
        </div>
      </div>
    ));

  return (<Nav content={renderContent()}/>);
};

GameScreen.propTypes = {
  playerBoard: PropTypes
    .arrayOf(PropTypes.array.isRequired)
    .isRequired,
  cpuBoard: PropTypes
    .arrayOf(PropTypes.array.isRequired)
    .isRequired,
  updatedPlayerBoard: PropTypes.bool.isRequired,
  shipsCpuCount: PropTypes.number.isRequired,
  shipsPlayerCount: PropTypes.number.isRequired,
  attemptFeedback: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  initCpuBoard: PropTypes.func.isRequired,
  playerAttack: PropTypes.func.isRequired,
  cpuAttack: PropTypes.func.isRequired,
  updateCurrentPlayer: PropTypes.func.isRequired,
  updateWinner: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  playerBoard: state.table.playerBoard,
  cpuBoard: state.table.cpuBoard,
  updatedPlayerBoard: state.table.updatedPlayerBoard,
  shipsCpuCount: state.table.shipsCpuCount,
  shipsPlayerCount: state.table.shipsPlayerCount,
  attemptFeedback: state.table.attemptFeedback,
  playerName: state.game.playerName,
  currentPlayer: state.game.currentPlayer
});

const mapDispatchToProps = (dispatch) => ({
  initCpuBoard: () => dispatch(tableAction.initCpuBoard()),
  playerAttack: (args) => dispatch(tableAction.playerAttack(args)),
  cpuAttack: () => dispatch(tableAction.cpuAttack()),
  updateCurrentPlayer: () => dispatch(ActionGames.updateCurrentPlayer()),
  updateWinner: (args) => dispatch(tableAction.updateWinner(args))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
