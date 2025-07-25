import React from "react";

export default function Controls({ saturation, lightness, onChange }) {
  return (
    <div style={{ marginBottom: 20, maxWidth: 400 }}>
      <label>
        Saturation (%):
        <input
          type="range"
          min="0"
          max="100"
          value={saturation}
          onChange={(e) => onChange("saturation", Number(e.target.value))}
        />
        <input
          type="number"
          min="0"
          max="100"
          value={saturation}
          onChange={(e) => onChange("saturation", Number(e.target.value))}
          style={{ width: 60, marginLeft: 10 }}
        />
      </label>
      <br />
      <label>
        Lightness (%):
        <input
          type="range"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => onChange("lightness", Number(e.target.value))}
        />
        <input
          type="number"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => onChange("lightness", Number(e.target.value))}
          style={{ width: 60, marginLeft: 10 }}
        />
      </label>
    </div>
  );
}
