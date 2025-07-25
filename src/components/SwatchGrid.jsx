import React, { useState, useCallback } from "react";
import ColorSwatch from "./ColorSwatch";
import styles from "./SwatchGrid.module.scss";
import { generateDistinctColors } from "../helpers/generateDistinctColors";
import { fetchColors } from "../api/fetchColors";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";

const SwatchGrid = ({ saturation, lightness }) => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numberOfColorsFetched, setNumberOfColorsFetched] = useState(0);
  const [currentColorHex, setCurrentColorHex] = useState(null);
  const [showDoneMessage, setShowDoneMessage] = useState(false);

  useDebouncedEffect(
    () => {
      const fetchColorData = async () => {
        setLoading(true);
        setColors([]);
        setLoading(true);
        await generateDistinctColors(
          fetchColors,
          saturation,
          lightness,
          updateColorCount,
          (partialColors) => {
            setColors(partialColors); // Progressive render
            if (partialColors.length > 0) {
              const latest = partialColors[partialColors.length - 1];
              setCurrentColorHex(latest.hex);
            }
          }
        );
        setLoading(false);
        setShowDoneMessage(true);
        setTimeout(() => setShowDoneMessage(false), 3000);
      };
      fetchColorData();
    },
    [saturation, lightness],
    500
  );

  const updateColorCount = useCallback((current) => {
    setNumberOfColorsFetched(current);
    return current;
  }, []);

  const SkeletonCard = () => <div className={styles.skeleton}></div>;

  return (
    <div className={styles.container}>
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
        {numberOfColorsFetched} fetched
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
