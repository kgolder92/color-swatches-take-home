export async function fetchColors(hue, saturation, lightness) {
  console.count("Color API calls");

  const url = `https://www.thecolorapi.com/id?hsl=${hue},${saturation},${lightness}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("API Error");

  const data = await response.json();

  return data;
}
