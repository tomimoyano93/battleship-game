import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ActionGames from "../../store/actions/actionGames";
import tableAction from "../../store/actions/actionTable";
import Nav from "./nav";
import Table from "../../components/molecules/table";
import ShipsTouch from "../../components/molecules/shipsTouch";
import {NUMBER_OF_SHIPS, SHIP_ORIENTATION} from "../../constants/ships";

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
      if (shipsPlayerCount === NUMBER_OF_SHIPS && playerName !== '') {
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
      alert('Please select a ship');
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

  const disableButtonOpacity = () => loadShipSelector
    ? 0.5
    : 0;
  const startGameButtonOpacity = () => start
    ? 1
    : disableButtonOpacity;

  return (
    <div>
      <div style={{ paddingBottom: 30 }}>
        {loadShipSelector
          ? (
            <p>
              Hi {name}!, please select your ships
            </p>
          )
          : <p>
            Please enter you Name
          </p>}
      </div>
      <div className="container">
        {loadShipSelector && (<ShipsTouch
          shipSaved={savedPlayerShip}
          carriers={carriersAvailable}
          cruisers={cruisersAvailable}
          submarines={submarinesAvailable}
          selectShip={(ship) => setShipSelected(ship)}
          selectOrientation={(value) => setOrientation(value)}
          restartSavedPlayerShip=
          {() => resetSavedPlayerShip()}/>)}
        <div className="boardContainer">
          <Table
            cpu={false}
            board={playerBoard}
            click
            onClickBoard=
            {(position) => saveShip(position)}
            shipSelected={shipSelected}
            shipOrientation={orientation}/>
        </div>
        <div>
          {!loadShipSelector && (
            <form onSubmit={handleOnSubmit} className='form'>
              <input
                onChange={handleOnChange}
                className="form-control"
                type="text"
                name="Player name"
                placeholder="Player name"
                style={{
                height: 30
              }}/>
              <button type="submit" value="Submit" className="button"/>
            </form>
          )}
          <Link to="/game">
            <button
              className="button"
              style={{
              opacity: startGameButtonOpacity
            }}
              disabled={!start}>
              Start Game
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

};

StartScreen.propTypes = {
  playerBoard: PropTypes.arrayOf(PropTypes.array.isRequired),
  carriersAvailable: PropTypes.number.isRequired,
  cruisersAvailable: PropTypes.number.isRequired,
  submarinesAvailable: PropTypes.number.isRequired,
  shipsPlayerCount: PropTypes.number.isRequired,
  savedPlayerShip: PropTypes.bool.isRequired,
  playerName: PropTypes.string.isRequired,
  initPlayerBoard: PropTypes.func.isRequired,
  updatePlayerBoard: PropTypes.func.isRequired,
  updatePlayerName: PropTypes.func.isRequired,
  restartSavedPlayerShip: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  playerBoard: state.table.playerBoard,
  carriersAvailable: state.table.carriersAvailable,
  cruisersAvailable: state.table.cruisersAvailable,
  submarinesAvailable: state.table.submarinesAvailable,
  shipsPlayerCount: state.table.shipsPlayerCount,
  savedPlayerShip: state.table.savedPlayerShip,
  playerName: state.game.playerName
});
const mapDispatchToProps = (dispatch) => ({
  initPlayerBoard: () => dispatch(tableAction.initPlayerBoard()),
  updatePlayerBoard: (args) => dispatch(tableAction.updatePlayerBoard(args)),
  updatePlayerName: (args) => dispatch(ActionGames.updatePlayerName(args)),
  restartSavedPlayerShip: () => dispatch(tableAction.restartSavedPlayerShip())
});

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);