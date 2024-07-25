import { useState } from "react";

export default function Player({
  initialname,
  symbol,
  isActive,
  onChangeName,
}) {
  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  //we can have multiple userstate values if required
  const [playerName, setPlayerName] = useState(initialname);
  const [isEditing, setIsEditing] = useState(false);
  //initially usestate is given false boolean value,means
  //initially input values not given
  // [] this symbol shows destructuring of values means
  // getting the specific values from the prop object

  function handleEditClick() {
    //state updating on the previous value automaticlly
    // editing is the updated by react true /false
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }

    //setIsEditing(!isEditing);
    //instead of !isEditing assign with function like (editing) =. !editing with assuarance value changes true to false
    //imideatly
    //setIsEditing(true);//make react fnction to execute again
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  //let btnCaption = "Edit";
  if (isEditing) {
    // btnCaption = "Save";
    // playerName = <input type="text" required defaultValue={name}></input>
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleChange}
      ></input>
    );
    //onchange function gives an object so passes
    //value can not be erased but defaultvalue can be edited
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
//in onclick button event handleeditclick is the function but dont mention () becz we have to pass the function as a value
//to update name have to call function again use usestate
