import SizeSelector from "./Components/SizeSelector";
import React, { useState } from "react";
import GameBoard from "./Components/GameBoard";

function App() {
  const [finalHeight, setFinalHeight] = useState(10);
  const [finalWidth, setFinalWidth] = useState(10);
  const [finalBombs, setFinalBombs] = useState(50);
  const [creating, setCreating] = useState(true);

  return (
    <div className="app">
      <h1 className="title">Minesweeper</h1>
      {creating ? (
        <SizeSelector
          setFinalHeight={setFinalHeight}
          setFinalWidth={setFinalWidth}
          setFinalBombs={setFinalBombs}
          setCreating={setCreating}
        />
      ) : (
        <GameBoard 
          finalHeight={finalHeight}
          finalWidth={finalWidth}
          finalBombs={finalBombs}
        />
      )}
    </div>
  );
}

export default App;
