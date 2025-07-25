import React from "react";
import styles from "./ColorSwatch.module.scss";

export default function ColorSwatch({ color }) {
  const { hex, name, rgb } = color;
  
  return (
    <>
      <div
        className={styles.colorSwatch}
        style={{
          backgroundColor: `#${hex}`,
        }}
      ></div>
      <div className={styles.colorInfo}>
       <b>{name}</b> 
       <span>{rgb}</span> 
      </div>
    </>
  );
}
