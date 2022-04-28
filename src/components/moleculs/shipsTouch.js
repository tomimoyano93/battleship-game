import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {SHIP_TYPES_CRUISER, SHIP_TYPES_CARRIER, SHIP_TYPES_SUBMARINE, SHIP_ORIENTATION} from "../../constants/ships";

const ShipsTouch = (props) => {
  const {
    carriers,
    cruisers,
    submarines,
    shipSaved,
    restartSavedPlayerShip,
    selectShip,
    selectOrientation
  } = props;
  const [currentCarrier,
    setCurrentCarrier] = useState(carriers);
  const [currentCruiser,
    setCurrentCruiser] = useState(cruisers);
  const [currentSubmarine,
    setCurrentSubmarine] = useState(submarines);
  const [currentOrientation,
    setCurrentOrientation] = useState(SHIP_ORIENTATION.VERTICAL);
  const [lastShip,
    setLastShip] = useState(' ');

  const savedShips = () => {
    switch (lastShip) {
      case 'Carrier':
        if (currentCarrier > 0) {
          setCurrentCarrier(currentCarrier - 1);
        }
        break;
      case 'Cruiser':
        if (currentCruiser > 0) {
          setCurrentCruiser(currentCruiser - 1);
        }
        break;
      case 'Submarine':
        if (currentSubmarine > 0) {
          setCurrentSubmarine(currentSubmarine - 1);
        }
        break;
      default:
        break;
    }
    restartSavedPlayerShip();
  };

  useEffect(() => {
    if (shipSaved) {
      savedShips();
    }
  }, [shipSaved]);

  const handleClickSelected = (tittle) => {
    switch (tittle) {
      case 'Carrier':
        if (currentCarrier > 0) {
          setLastShip('Carrier');
          selectShip(SHIP_TYPES_CARRIER);
        }
        break;
      case 'Cruiser':
        if (currentCruiser > 0) {
          setLastShip('Cruiser');
          selectShip(SHIP_TYPES_CRUISER);
        }
        break;
      case 'Submarine':
        if (currentSubmarine > 0) {
          setLastShip('Submarine');
          selectShip(SHIP_TYPES_SUBMARINE);
        }
        break;
      default:
        break;
    }
  }

  const handleOnClick = () => {
    if (currentOrientation === SHIP_ORIENTATION.HORIZONTAL) {
      setCurrentOrientation(SHIP_ORIENTATION.VERTICAL);
      selectOrientation(SHIP_ORIENTATION.VERTICAL);
    } else {
      setCurrentOrientation(SHIP_ORIENTATION.HORIZONTAL);
      selectOrientation(SHIP_ORIENTATION.HORIZONTAL);
    }
  };

  const renderRow = (tittle, number) => { < div > <div>
    <label>
      {tittle}
      : {number}
    </label>
  </div> < div > <div>
    <button onClick={() => handleClickSelected(tittle)}>
      Select
    </button>
  </div> </div>
  </div >
};

const text = currentOrientation === SHIP_ORIENTATION.HORIZONTAL
  ? 'V'
  : 'H';

const rotateShips = () => { <div> <label>{text}</label> < button onClick = {
    () => handleOnClick()
  } > </button> </div>
};

return (
  <div>
    {renderRow('Carriers', currentCarrier, carriers)}
    {renderRow('Cruisers', currentCruiser, cruisers)}
    {renderRow('Submarines', currentSubmarine, submarines)}
    {rotateShips()}
  </div >);

};

ShipsTouch.propTypes = {
  carriers: PropTypes.number.isRequired,
  cruisers: PropTypes.number.isRequired,
  submarines: PropTypes.number.isRequired,
  shipSaved: PropTypes.bool.isRequired,
  restartSavedPlayerShip: PropTypes.func.isRequired,
  selectShip: PropTypes.func.isRequired,
  selectOrientation: PropTypes.func.isRequired
};

export default ShipsTouch;