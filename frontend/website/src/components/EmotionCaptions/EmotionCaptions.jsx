import React from "react";

// TODO: figure out actual coloring per sentence
// TODO: look into on hovers for the text
const EmotionCaptions = ({ sentences }) => {
  return sentences.map(({ text }) => text).join(" ");
};

export default EmotionCaptions;
