/* eslint-disable react-hooks/exhaustive-deps, no-alert */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import BoardActions from '../../store/actions/actionTable';
import GameActions from '../../store/actions/actionGames';
import Screen from '../../screens/screen';
import Table from '../../components/molecules/table';
import ShipTouch from '../../components/molecules/shipsTouch';
import {NUMBER_OF_SHIP, SHIP_ORIENTATION} from '../../constants/ships';
import {
  Label,
  StartDiv,
  TableDiv,
  AllButton,
  Input,
  TableDiv2
} from '../screenStyles'

const StartScreen = (props) => {
  const {
    playerBoard,
    carriersAvailable,
    cruisersAvailable,
    submarinesAvailable,
    shipsPlayerCount,
    savedPlayerShip,
    playerName,
    initPlayerBoard,
    updatePlayerBoard,
    updatePlayerName,
    restartSavedPlayerShip
  } = props;
  const [shipSelected,
    setShipSelected] = useState(0);
  const [orientation,
    setOrientation] = useState(SHIP_ORIENTATION.VERTICAL);
  const [start,
    setStart] = useState(false);
  const [name,
    setName] = useState('');
  const [loadShipSelector,
    setLoadShipSelector] = useState(false);

  useEffect(() => {
    initPlayerBoard();
  }, []);

  useEffect(() => {
    const handleStart = () => {
      if (shipsPlayerCount === NUMBER_OF_SHIP.TOTAL && playerName) {
        setStart(true);
      }
    };

    if (savedPlayerShip) {
      setShipSelected(0);
      handleStart();
    }
  }, [shipsPlayerCount, playerName, savedPlayerShip]);

  const saveShip = async(position) => {
    if (!!shipSelected) {
      const shipData = {
        row: position.row,
        col: position.col,
        ship: shipSelected,
        orientation
      };
      await updatePlayerBoard(shipData);
    } else {
      alert('Please select a ship!');
    }
  };

  const resetSavedPlayerShip = () => {
    restartSavedPlayerShip();
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSubmit = () => {
    setLoadShipSelector(true);
    updatePlayerName(name);
  };

  const renderContent = () => {
    const disableButtonOpacity = loadShipSelector
      ? 0.6
      : 0;
    const startGameButtonOpacity = start
      ? 1
      : disableButtonOpacity;
    return (
      <div>
        <div style={{marginBottom: '30px'}}>
          {loadShipSelector
            ? (
              <Label>
                Hi {' '}
                {name}
                , please locate your ships!
              </Label>
            )
            : <Label>Please enter your name!</Label>}
        </div>
        <StartDiv>
          {loadShipSelector && (<ShipTouch
            shipSaved={savedPlayerShip}
            carriers={carriersAvailable}
            cruisers={cruisersAvailable}
            submarines={submarinesAvailable}
            selectShip={(ship) => setShipSelected(ship)}
            selectOrientation={(value) => setOrientation(value)}
            restartSavedPlayerShip={() => resetSavedPlayerShip()}/>)}
          <TableDiv>
            <Table
              cpu={false}
              board={playerBoard}
              click
              onClickBoard={(position) => saveShip(position)}
              shipSelected={shipSelected}
              shipOrientation={orientation}/>
          </TableDiv>
          <TableDiv2>
            {!loadShipSelector && (
              <form onSubmit={handleOnSubmit}>
                <input
                  onChange={handleOnChange}
                  className="form-control"
                  type="text"
                  name="Player name"
                  placeholder="Player name"
                  style={{height: 30}}/>
                <Input type="submit" value="Start Game"/>
              </form>
            )}
            <Link to="/game">
              <AllButton
                style={{opacity: startGameButtonOpacity}}
                disabled={!start}>
                Start Game
              </AllButton>
            </Link>
          </TableDiv2>
        </StartDiv>
      </div>
    );
  };

  return (<Screen content={renderContent()}/>);
};

const mapStateToProps = (state) => ({
  playerBoard: state.board.playerBoard,
  carriersAvailable: state.board.carriersAvailable,
  cruisersAvailable: state.board.cruisersAvailable,
  submarinesAvailable: state.board.submarinesAvailable,
  shipsPlayerCount: state.board.shipsPlayerCount,
  savedPlayerShip: state.board.savedPlayerShip,
  playerName: state.game.playerName
});

const mapDispatchToProps = (dispatch) => ({
  initPlayerBoard: () => dispatch(BoardActions.initEmptyBoard()),
  updatePlayerBoard: (args) => dispatch(BoardActions.updatePlayerBoard(args)),
  updatePlayerName: (args) => dispatch(GameActions.updatePlayerName(args)),
  restartSavedPlayerShip: () => dispatch(BoardActions.restartSavedPlayerShip())
});

export default connect(mapStateToProps, mapDispatchToProps,)(StartScreen);
