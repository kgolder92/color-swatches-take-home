// const cache = new Map();
export async function fetchColors(hue, saturation, lightness) {
  //   const key = `${hue},${saturation},${lightness}`;
  //   if (cache.has(key)) return cache.get(key);

  console.count("Color API calls");

  const url = `https://www.thecolorapi.com/id?hsl=${hue},${saturation},${lightness}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("API Error");

  const data = await response.json();
  //   cache.set(key, data);

  return data;
}
