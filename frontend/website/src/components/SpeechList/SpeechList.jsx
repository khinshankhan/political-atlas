import React from "react";

const SpeechList = ({ speeches }) => {
  console.log(speeches);
  return <>{JSON.stringify(speeches, null, 2)}</>;
};

export default SpeechList;
