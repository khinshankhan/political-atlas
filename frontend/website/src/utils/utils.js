export const capitalize = (word) =>
  word
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");

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
    console.log(err);
    return "Failed to copy!";
  }
};

export const roundUpX = (num, place) => Math.ceil(num / place) * place;

export const roundDecimal2 = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const chunker = (chunkSize, arr) =>
  arr.reduce((stored, current, index) => {
    if (index % chunkSize === 0) {
      stored.push([current]);
    } else {
      stored[stored.length - 1].push(current);
    }
    return stored;
  }, []);

export const validNumberString = (stringifiedNumber) => {
  const re = /^[0-9\b]+$/;
  return re.test(stringifiedNumber);
};

export const arrToHex = (arr) =>
  arr.reduce((hex, code) => {
    const hexcode = Number(code).toString(16);
    if (hexcode.length < 2) return hex + "0" + hexcode;
    return hex + hexcode;
  }, "#");
