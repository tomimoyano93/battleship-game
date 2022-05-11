import React from 'react';
import {Tittle} from './screenStyles'

const Screen = ({ content }) => (
  <div>
    <header>
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
