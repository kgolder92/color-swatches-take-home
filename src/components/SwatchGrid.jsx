import React, { useState } from "react";
import ColorSwatch from "./ColorSwatch";
import styles from "./SwatchGrid.module.scss";
import { generateDistinctColors } from "../helpers/generateDistinctColors";
import { fetchColors } from "../api/fetchColors";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";

const SwatchGrid = ({ saturation, lightness }) => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [currentColorHex, setCurrentColorHex] = useState(null);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  useDebouncedEffect(
    () => {
      let didCancel = false;

      const fetchColorData = async () => {
        setLoading(true);
        setErrorMessages([]);
        setColors([]);
        setLoading(true);
        try {
          await generateDistinctColors(
            fetchColors,
            saturation,
            lightness,
            (partialColors) => {
              if (!didCancel) {
                setColors(partialColors); // Progressive render
                if (partialColors.length > 0) {
                  const latest = partialColors[partialColors.length - 1];
                  setCurrentColorHex(latest.hex);
                }
              }
            },
            (errMessage, err) => {
              if (!didCancel) {
                setErrorMessages((prev) => [
                  ...prev,
                  `${errMessage} ${err.message}`,
                ]);
              }
            }
          );

          if (!didCancel) {
            setShowDoneMessage(true);
            setTimeout(() => setShowDoneMessage(false), 3000);
          }
        } catch (err) {
          if (!didCancel) {
            console.error(err);
            setErrorMessages((prev) => [
              ...prev,
              "Oops! Something went wrong fetching the colors.",
            ]);
          }
        } finally {
          if (!didCancel) setLoading(false);
        }
      };
      fetchColorData();
      return () => {
        didCancel = true; // prevents state updates from old requests
      };
    },
    [saturation, lightness],
    500
  );

  const SkeletonCard = () => <div className={styles.skeleton}></div>;

  return (
    <div className={styles.container}>
      {errorMessages.length > 0 && (
        <div className={styles.error}>
          <strong>Errors while fetching:</strong>
          <ul>
            {errorMessages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      {showDoneMessage && (
        <div className={styles.toast}>🥳 All colors loaded!🥳</div>
      )}
      <h3
        className={styles.counterText}
        style={{
          color: currentColorHex ? `#${currentColorHex}` : undefined,
          transition: "color 0.4s ease",
        }}
      >
        {colors.length} fetched
      </h3>
      <div className={styles.swatchGrid}>
        {loading && colors.length < 12
          ? [...Array(12)].map((_, idx) => (
              <div key={idx} className={styles.colorSwatchWrapper}>
                {colors[idx] ? (
                  <ColorSwatch color={colors[idx]} loading={loading} />
                ) : (
                  <SkeletonCard />
                )}
              </div>
            ))
          : colors.map((color, idx) => (
              <div key={idx} className={styles.colorSwatchWrapper}>
                <ColorSwatch color={color} loading={loading} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default SwatchGrid;
