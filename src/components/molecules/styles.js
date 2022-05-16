import styledComponents from 'styled-components';

export const CellComponent = styledComponents.div`
    width: 39px;
    height: 39px;
    border: 1px solid black;
    background-color: ${ (props) => (props.color
  ? props.color
  : 'white')};
`;

export const Container = styledComponents.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 500px;
    border: 11px solid rgb(3,3,65,1);
    background-color: rgb(2,2,120,0.9);
    margin-right: 50px;

    @media screen and (max-width: 480px) {
        width: 300px;
        height: 400px;
        margin-right: 0px;
        margin-top: 50vh;
        margin-bottom: 10vh;
    }
`;

export const RowContainer = styledComponents.div`
    margin-bottom: 10px;
`;

export const Row = styledComponents.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-family: 'Share Tech Mono';
    font-weight: bold;
    font-size: 1.2em;
    color: black;
`;
export const TableCenter = styledComponents.div`
    margin-bottom: 30px;
`;

export const Column = styledComponents.div`
    display: flex;
    justify-content: center;
`;

export const ButtonShip = styledComponents.button`
    height: 40px; 
    width: 120px; 
   
    background-color: black; 
    color: white;

    @media screen and (max-width: 480px) {
        width: 100px;
        margin-left: 10px;
    }
`;

export const Label2 = styledComponents.label`
    font-family: 'Share Tech Mono';
    font-size: 1.1em;
    color: black;
    align-self: center;

    @media screen and (max-width: 480px) {
        font-size: 1.4em;
    }
`;

export const TableCenter2 = styledComponents.div`
    align-self: center;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
`;
