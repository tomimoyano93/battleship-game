import React from 'react';
import {Tittle} from './screenStyles'

const Screen = ({content}) => (
  <div>
    <header style={{
      margin: '30px 0px 20px 0px'
    }}>
      <Tittle>
        Battleship
      </Tittle>
    </header>
    <div>
      {content}
    </div>
  </div>
);

export default Screen;
