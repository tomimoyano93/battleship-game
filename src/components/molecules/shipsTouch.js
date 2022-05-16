import React, {useState, useEffect} from 'react';
import {SHIP_TYPE_CARRIER, SHIP_TYPE_CRUISER, SHIP_TYPE_SUBMARINE, SHIP_ORIENTATION} from '../../constants/ships';
import {RowContainer, Row, Column, ButtonShip, Label2} from './styles'

const ShipTouch = (props) => {
  const {
    carriers,
    cruisers,
    submarines,
    shipSaved,
    restartSavedPlayerShip,
    selectShip,
    selectOrientation
  } = props;
  const [currentCarriers,
    setCurrentCarriers] = useState(carriers);
  const [currentCruisers,
    setCurrentCruisers] = useState(cruisers);
  const [currentSubmarines,
    setCurrentSubmarines] = useState(submarines);
  const [orientation,
    setOrientation] = useState(SHIP_ORIENTATION.VERTICAL);
  const [lastShip,
    setLastShip] = useState('');

  const updateShips = () => {
    switch (lastShip) {
      case 'Carrier':
        if (currentCarriers > 0) {
          setCurrentCarriers(currentCarriers - 1);
        }
        break;
      case 'Cruise':
        if (currentCruisers > 0) {
          setCurrentCruisers(currentCruisers - 1);
        }
        break;
      case 'Submarine':
        if (currentSubmarines > 0) {
          setCurrentSubmarines(currentSubmarines - 1);
        }
        break;
      default:
        break;
    }
    restartSavedPlayerShip();
  };

  useEffect(() => {
    if (shipSaved) {
      updateShips();
    }
    // eslint-disable-next-line
  }, [shipSaved]);

  const handleClickSelect = (title) => {
    switch (title) {
      case 'Carriers':
        if (currentCarriers > 0) {
          setLastShip('Carrier');
          selectShip(SHIP_TYPE_CARRIER);
        }
        break;
      case 'Cruisers':
        if (currentCruisers > 0) {
          setLastShip('Cruise');
          selectShip(SHIP_TYPE_CRUISER);
        }
        break;
      case 'Submarines':
        if (currentSubmarines > 0) {
          setLastShip('Submarine');
          selectShip(SHIP_TYPE_SUBMARINE);
        }
        break;
      default:
        break;
    }
  };

  const handleOnClick = () => {
    if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
      setOrientation(SHIP_ORIENTATION.VERTICAL);
      selectOrientation(SHIP_ORIENTATION.VERTICAL);
    } else {
      setOrientation(SHIP_ORIENTATION.HORIZONTAL);
      selectOrientation(SHIP_ORIENTATION.HORIZONTAL);
    }
  };

  const renderRow = (title, number) => (
    <RowContainer>
      <Row>
        <Label2>
          {title}
          : {' '}
          {number}
        </Label2>
      </Row>
      <Column>
        <ButtonShip onClick={() => handleClickSelect(title)}>
          Select
        </ButtonShip>
      </Column>
    </RowContainer>
  );

  const text = orientation === SHIP_ORIENTATION.HORIZONTAL
    ? 'Direction: Horizontal'
    : 'Direction: Vertical';

  const renderRotateButton = () => (
    <Row>
      <Label2 style={{
        paddingRight: 15
      }}>{text}</Label2>
      <ButtonShip
        style={{
        paddingRight: 15
      }}
        onClick={() => handleOnClick()}
        type="button">Rotate</ButtonShip>
    </Row>
  );

  return (
    <div>
      {renderRow('Carriers', currentCarriers)}
      {renderRow('Cruisers', currentCruisers)}
      {renderRow('Submarines', currentSubmarines)}
      {renderRotateButton()}
    </div>
  );
};

export default ShipTouch;
