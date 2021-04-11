export const capitalize = (word) =>
  word[0].toUpperCase() + word.substring(1).toLowerCase();

export const shadeColor = (color, percentage) =>
  color.map((rgb) => rgb + rgb * percentage);

// https://stackoverflow.com/a/36888120
export const contrastColor = ([r, g, b]) => {
  // calculate the perceptive luminance (aka luma) - human eye favors green color...
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // return black for bright colors, white for dark colors
  return luma > 0.5 ? "black" : "white";
};

export const copy = async (item) => {
  try {
    await navigator.clipboard.writeText(item);
    return "Copied!";
  } catch (err) {
    return "Failed to copy!";
  }
};

export const roundUpX = (num, place) => Math.ceil(num / place) * place;

export const roundDecimal2 = (num) => (Math.round(num * 100) / 100).toFixed(2);
