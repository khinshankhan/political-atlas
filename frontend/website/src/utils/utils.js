export const capitalize = (word) =>
  word[0].toUpperCase() + word.substring(1).toLowerCase();

export const shadeColor = (color, percentage) =>
  color.map((rgb) => rgb + rgb * percentage);

export const copy = async (item) => {
  try {
    await navigator.clipboard.writeText(item);
    return "Copied!";
  } catch (err) {
    return "Failed to copy!";
  }
};
