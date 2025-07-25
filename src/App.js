import React, { useState } from "react";
import SwatchGrid from "./components/SwatchGrid";
import Controls from "./components/Controls";
import "./App.scss";

const App = () => {
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);

  return (
    <div className="app-container">
      <div className="app-header-wrapper">
        <h1 className="app-text-header">Distinct Color Explorer</h1>
        <Controls
          saturation={saturation}
          lightness={lightness}
          onChange={(type, value) => {
            if (type === "saturation") setSaturation(value);
            else if (type === "lightness") setLightness(value);
          }}
        />
      </div>
      <SwatchGrid saturation={saturation} lightness={lightness} />
    </div>
  );
};

export default App;
