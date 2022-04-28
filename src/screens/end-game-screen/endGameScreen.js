import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Nav from '../start-screen/nav';
import tableAction from '../../store/actions/actionTable';
import ActionGames from '../../store/actions/actionGames';

const EndGameScreen = ({winner, resetBoard, restartGame}) => {
  const handleClickRestart = () => {
    resetBoard();
    restartGame();
  };

  const renderContent = () => (
    <div>
      <div>
        <p>
          {winner
            ? (
              <p>
                {winner}
                {' '}
                wins!
              </p>
            )
            : (
              <p>
                Draw!
              </p>
            )}
          <Link to="/">
            <button onCLick={() => handleClickRestart()}>
              Restart
            </button>
          </Link>
        </p>
      </div>
    </div>
  );

  return (<Nav content={renderContent()}/>);
};

EndGameScreen.propTypes = {
  winner: PropTypes.string,
  resetBoard: PropTypes.func,
  restartGame: PropTypes.func
};

const mapStateToProps = (state) => ({winner: state.game.winner});

const mapDispatchToProps = (dispatch) => ({
  resetBoard: () => dispatch(tableAction.restart()),
  restartGame: () => dispatch(ActionGames.restart())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndGameScreen);