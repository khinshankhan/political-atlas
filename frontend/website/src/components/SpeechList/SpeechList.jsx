import React from "react";

import SpeechCard from "./SpeechCard";

const SpeechList = ({ speeches }) => {
  return (
    <>
      {speeches.length === 0 ? (
        "No speeches found!"
      ) : (
        <SpeechCard speech={speeches[0]} />
      )}
    </>
  );
};

export default SpeechList;
