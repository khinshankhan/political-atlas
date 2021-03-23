import React from "react";

const EmotionText = ({ sentences }) => {
  return <>{sentences.map(({ text }) => text).join(" ")}</>;
};

export default EmotionText;
