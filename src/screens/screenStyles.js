import styledComponents from "styled-components";

export const StartDiv = styledComponents.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
align-content: stretch;

@media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    align-content: center;
}
`;

export const Tittle = styledComponents.label`
    font-family: 'Share Tech Mono';
    font-size:  ${ (props) => (props.size
  ? props.size
  : '1.7em')};
    font-weight: bold;
    color: black;
    align-self: center;

    @media screen and (max-width: 480px) {
        font-size: 1.4em;
    }
`;
export const Label = styledComponents.label`
    font-family: 'Share Tech Mono';
    font-size:  ${ (props) => (props.size
  ? props.size
  : '1.4em')};
    color: black;
    align-self: center;

    @media screen and (max-width: 480px) {
        font-size: 1.4em;
    }
`;

export const TableDiv = styledComponents.div`
    flex-direction: column;
    
`;

export const TableDiv2 = styledComponents.div`
    flex-direction: column; 
    margin-left: 25px;

    @media screen and (max-width: 480px) {
        margin-top: 50%;
        margin-left: 0px;
    }
`;

export const AllButton = styledComponents.button`
    height: 50px; 
    width: 150px; 
   
    background-color: #144205; 
    color: white;

    @media screen and (max-width: 480px) {
        width: 100px;
        margin-left: 10px;
    }
`;

export const Input = styledComponents.input`
height: 50px; 
width: 150px; 
margin-left: 50px; 
background-color: #144205; 
color: white;

@media screen and (max-width: 480px) {
    width: 100px;
    margin-left: 10px;
}
`;

export const GameContainer = styledComponents.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media screen and (max-width: 480px) {
        width: 90vw;
        margin-top: 50vh;
        flex-direction: column;
        align-items: center;
    }
`;

export const GameCpuContainer = styledComponents.div`
    flex-direction: column; 
    margin-left: 30px;

    @media screen and (max-width: 480px) {
        margin-top: 140px;
        margin-left: 0px;
    }
`;

export const Feedback = styledComponents.div`
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    @media screen and (max-width: 480px) {
        flex-direction: row;
        width: 100%;
    }
`;
export const ButtonContainer = styledComponents.div`
    flex-direction: column;
    justify-content: center;
    width: 100%;
    @media screen and (max-width: 480px) {
        flex-direction: row;
        width: 100%;
    }
`;

export const EndGameDiv = styledComponents.div`
    display: flex;
    flex-direction: column;
    border-color: black;
    border-width: 10px;
    margin-top: 50px;
    justify-content: center;
`;