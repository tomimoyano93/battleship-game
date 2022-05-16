import React, {useState, useEffect} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import BoardActions from '../../store/actions/actionTable';
import GameActions from '../../store/actions/actionGames';
import Screen from '../../screens/screen';
import Table from '../../components/molecules/table';
import {
  GameContainer,
  GameCpuContainer,
  AllButton,
  Label,
  Feedback,
  ButtonContainer
} from '../screenStyles'

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
    ? <Navigate to="/end" push/>
    : (
      <div>
        <GameContainer>
          <div style={{flexDirection: 'column'}}>
            <div>
              <Label>{playerName}</Label>
            </div>
            <Table cpu={false} click={false} board={playerBoard}/>
          </div>
          <Feedback>
            <Label>
              {attemptFeedback}
            </Label>
          </Feedback>
          <GameCpuContainer>
            <div style={{marginTop: '10px'}}>
              <Label>
                CPU
              </Label>
            </div>
            <Table
              cpu
              click
              board={cpuBoard}
              onClickBoard={(position) => handleClickBoard(position)}/>
          </GameCpuContainer>
        </GameContainer>
        <div>
          <ButtonContainer>
            <Label>
              Shift: {' '}
              {currentPlayer}
            </Label>
          </ButtonContainer>
          <Link to="/end">
            <AllButton >
              Surrender
            </AllButton>
          </Link>
        </div>
      </div>
    ));

  return (<Screen content={renderContent()}/>);
};

const mapStateToProps = (state) => ({
  playerBoard: state.board.playerBoard,
  cpuBoard: state.board.cpuBoard,
  updatedPlayerBoard: state.board.updatedPlayerBoard,
  shipsCpuCount: state.board.shipsCpuCount,
  shipsPlayerCount: state.board.shipsPlayerCount,
  attemptFeedback: state.board.attemptFeedback,
  playerName: state.game.playerName,
  currentPlayer: state.game.currentPlayer
});

const mapDispatchToProps = (dispatch) => ({
  initCpuBoard: () => dispatch(BoardActions.initCpuBoard()),
  playerAttack: (args) => dispatch(BoardActions.playerAttack(args)),
  cpuAttack: () => dispatch(BoardActions.cpuAttack()),
  updateCurrentPlayer: () => dispatch(GameActions.updateCurrentPlayer()),
  updateWinner: (args) => dispatch(GameActions.updateWinner(args))
});

export default connect(mapStateToProps, mapDispatchToProps,)(GameScreen);
