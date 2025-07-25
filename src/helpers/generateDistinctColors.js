export async function generateDistinctColors(
  apiCallback,
  saturation,
  lightness,
  partial,
  onError
) {
  const distinctColors = [];
  const seenNames = new Set();

  let hue = 0;
  const maxHue = 359;

  while (hue <= maxHue) {
    let response;
    try {
      response = await apiCallback(hue, saturation, lightness);
    } catch (error) {
      onError?.(`failed to fetch color for hue ${hue}: `, error);
      hue++; // try the next one
      continue;
    }

    const name = response?.name?.value?.toLowerCase();
    if (!name || seenNames.has(name)) {
      hue++;
      continue;
    }

    seenNames.add(name);

    distinctColors.push({
      name,
      hex: response.hex.clean,
      hue,
      rgb: response.rgb.value,
    });
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
      let midResponse;
      try {
        midResponse = await apiCallback(mid, saturation, lightness);
      } catch (error) {
        onError?.(`failed to fetch color for hue ${mid}:`, error);
        low = mid + 1; //skip this mid hue
        continue;
      }

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
