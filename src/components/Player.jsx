import { useState, useRef } from "react";

export default function Player() {

  // Ref hooks - to store the input value
  //alternative to useState
  const playerName = useRef("");
  const [name, setName] = useState("unknown entity");
  
  function handleClick() {
    setName(playerName.current.value);
  }


  return (
    <section id="player">
      <h2>Welcome {name ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
