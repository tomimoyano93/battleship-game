import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import BoardActions from '../../store/actions/actionTable';
import GameActions from '../../store/actions/actionGames';
import Screen from '../../screens/screen';
import {Label, AllButton, EndGameDiv} from '../screenStyles'

const EndGameScreen = ({winner, resetBoard, restartGame}) => {
  const handleClickRestart = () => {
    resetBoard();
    restartGame();
  };

  const renderContent = () => (
    <div>
      <div style={{flexDirection: 'column'}}>
        <EndGameDiv>
          {winner
            ? (
              <Label>
                {winner}
                {' '}
                wins!
              </Label>
            )
            : (
              <Label>
                You have surrendered
              </Label>
            )}
          <Link style={{paddingTop: 50}} to="/">
            <AllButton onClick={() => handleClickRestart()}>
              Restart
            </AllButton>
          </Link>
        </EndGameDiv>
      </div>
    </div>
  );

  return (<Screen content={renderContent()}/>);
};

const mapStateToProps = (state) => ({winner: state.game.winner});

const mapDispatchToProps = (dispatch) => ({
  resetBoard: () => dispatch(BoardActions.restart()),
  restartGame: () => dispatch(GameActions.restart())
});

export default connect(mapStateToProps, mapDispatchToProps,)(EndGameScreen);
