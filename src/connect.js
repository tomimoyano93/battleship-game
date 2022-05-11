import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartScreen from '../src/screens/start-screen/startScreen';
import GameScreen from '../src/screens/game-screen/gameScreen';
import EndGameScreen from '../src/screens/end-game-screen/endGameScreen';

const ApplicationRouter = () => (
  <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<StartScreen/>} />
            <Route path="/game" element={<GameScreen/>} />
            <Route path="/end" element={<EndGameScreen/>} />
        </Routes>
    </BrowserRouter>
);

export default ApplicationRouter;
