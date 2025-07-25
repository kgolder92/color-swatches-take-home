export async function generateDistinctColors(
  apiCallback,
  saturation,
  lightness,
  onStep,
  partial
) {
  const distinctColors = [];
  const seenNames = new Set();

  let hue = 0;
  const maxHue = 359;
  let colorsFetchedCounter = 0;

  while (hue <= maxHue) {
    const response = await apiCallback(hue, saturation, lightness);
    const name = response?.name?.value?.toLowerCase();

    if (!name || seenNames.has(name)) {
      hue++;
      continue;
    }

    seenNames.add(name);
    colorsFetchedCounter += 1;
    distinctColors.push({
      name,
      hex: response.hex.clean,
      hue,
      rgb: response.rgb.value,
    });
    onStep?.(colorsFetchedCounter);
    if (partial) {
      partial([...distinctColors]);
    }

    // Binary search for the next hue where the name changes
    let low = hue + 1;
    let high = maxHue;
    let nextHue = maxHue + 1;
    let cachedMidName = name; // track last midName

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midResponse = await apiCallback(mid, saturation, lightness);
      const midName = midResponse?.name?.value?.toLowerCase();

      if (!midName || midName === name) {
        low = mid + 1;
      } else {
        cachedMidName = midName;
        nextHue = mid;
        high = mid - 1;
      }
    }

    // Only jump to the new hue if the name is different and unseen
    if (!seenNames.has(cachedMidName)) {
      hue = nextHue;
    } else {
      break; // All distinct names found
    }
  }

  return distinctColors;
}
