export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={"${turn.square.row}${turn.square.col}"}>
          {turn.player}selected{turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}
// map --which player selected wich row,col index
//getting game turns app component
// key is the combination of row and column
//$() is the javascript syntax ,key is creating string
// log gives the message
