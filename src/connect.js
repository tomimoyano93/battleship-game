import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EndGameScreen from "./screens/end-game-screen/endGameScreen";
import GameScreen from "./screens/game-screen/gameScreen";
import StarScreen from "./screens/start-screen/startScreen";


const ApplicationRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<StarScreen/>} />
            <Route path="/game" element={<GameScreen/>} />
            <Route path="/end" element={<EndGameScreen/>} />
        </Routes>
    </BrowserRouter>
);

export default ApplicationRouter;