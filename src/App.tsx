import React from "react";
import Logo from "./assets/logo.png";
import ThreeCanvas from "./components/ThreeCanvas";

import "./styles/app.css";

function App() {
  return (
    <div className="bg-stone-800 w-full h-full">
      <div className="flex justify-center align-center w-1/2 m-auto">
        <h1 className="title">Hello React TS</h1>
      </div>
      <ThreeCanvas />
      <div className="text-green-400">test</div>
    </div>
  );
}

export default App;
