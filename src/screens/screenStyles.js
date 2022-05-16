import styledComponents from "styled-components";

export const StartDiv = styledComponents.div`
display: grid;
justify-content: center;
align-items: center;

    @media (min-width: 1200px) {
        grid-template-columns: 30% 50% 10%;
        grid-template-rows: auto;
}

`;

export const Tittle = styledComponents.label`
    font-size:  1.7em;
    font-weight: bold;
    color: black;
    align-self: center;
`;
export const Label = styledComponents.label`
    font-size:  1.4em;
    color: black;
    align-self: center;
    justify-content: center;
`;

export const TableDiv = styledComponents.div`
    flex-direction: column;
`;

export const TableDiv2 = styledComponents.div`
    flex-direction: column; 
    margin-left: 25px;
`;

export const AllButton = styledComponents.button`
    height: 40px; 
    width: 120px;
    justify-content: center;
    background-color: black; 
    color: white;
`;

export const Input = styledComponents.input`
    height: 40px; 
    width: 120px;
    justify-content: center;
    background-color: black; 
    color: white;
`;

export const GameContainer = styledComponents.div`
    display:grid;

    @media (min-width: 1200px) {
    grid-template-columns: 43% 14% 43%;
    align-items: center;}
`;

export const GameCpuContainer = styledComponents.div`
    align-items: center;
    height: 500px;
`;

export const Feedback = styledComponents.div`
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;
export const ButtonContainer = styledComponents.div`
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
`;

export const EndGameDiv = styledComponents.div`
    display: flex;
    flex-direction: column;
    border-color: black;
    border-width: 10px;
    margin-top: 50px;
    justify-content: center;
`;