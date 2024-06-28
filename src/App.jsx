import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.jsx";
import GameOver from "./components/GameOver.jsx";
const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
 //grid model intialization above
 //grid values are displayed dynamical
function deriveActivePlayer(gameTurns){
  let currentplayer = 'X';      
  if( gameTurns.length >0 && gameTurns[0].player ==='X')
    {
      currentplayer = 'O';
    }
    return currentplayer;
}
function App() { 
  const [players, setPlayers] = useState({
    'X':'player 1',
    'O':'player 2',
  });
  const [gameTurns,setGameTurns]= useState([]);
  //const [hasWinner, setHasWinner] = useState(false);
  //const [activePlayer, setActivePlayer] = useState('X');
  // to check who is the winner
  const activePlayer = deriveActivePlayer(gameTurns);
  //after finishing game reseeting values in the gameboard   
  let gameboard = [...initialGameBoard.map(array => [...array])];
  for (const turn of gameTurns)
      { 
          const{ square,player } = turn;
          const{ row, col } = square;
          //gives row and column index number of the player  clicked 
          //below updates the row and col with clicked player symbol
           gameboard[row][col] = player;
   } 
   let winner;   
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];
    //winning conditions checking
    if (firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
       ){
    winner = players[firstSquareSymbol];
    }
  }
  // number of entries will be 9 and code for draw match
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    //setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
    const currentplayer = deriveActivePlayer(prevTurns);
    const updatedTurns =[ 
      { square: { row:rowIndex,col:colIndex},player: currentplayer },
      ...prevTurns,
    ];
    return updatedTurns; 
  });
 }
 //To make Refresh the page making turns to empty array 
 function handleRematch()
 {
  setGameTurns([]);
 }
 function handlePlayerNameChange(symbol,newName)
 {
  setPlayers(prevPlayers => {
    return{
      ...prevPlayers,
      [symbol] : newName
    };
  });
 }
  return (
    
          <main>
            <div id="game-container">
              <ol id="players" className="highlight-player">                
              <Player initialname="Player1" symbol="X" isActive={activePlayer === 'X'} onChangeName = {handlePlayerNameChange}  ></Player>  
              <Player initialname="Player2" symbol="O" isActive={activePlayer === 'O'} onChangeName = {handlePlayerNameChange}></Player>
              </ol> 
              {(winner || hasDraw) && (<GameOver winner = {winner} onRestart={handleRematch}/>)}              
              <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />  
              GAME BOARD          
            </div>   
            <Log turns={gameTurns}/>       
        </main>        
     );
}
export default App
//to check which player choosen which symbol