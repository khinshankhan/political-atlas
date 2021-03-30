import React from "react";

import SpeechCard from "./SpeechCard";

const SpeechList = ({ speeches }) => {
  return (
    <>
      {speeches == null || speeches.length === 0
        ? "No speeches found!"
        : speeches.map((speech, i) => (
            <div key={i}>
              <SpeechCard speech={speech} /> <br />
            </div>
          ))}
    </>
  );
};

export default SpeechList;
