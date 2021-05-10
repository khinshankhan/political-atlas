import React from "react";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { sortedEmotions } from "src/utils/emotions";
import { capitalize } from "src/utils/utils";

const EmotionControls = ({ handleOnChange, downMd }) => {
  if (downMd) {
    return (
      <>
        <FormLabel component="legend">Choose Emotion</FormLabel>
        {sortedEmotions.map((emotion, i) => (
          <FormControlLabel
            key={i}
            control={<Switch onChange={handleOnChange} name={emotion} />}
            label={capitalize(emotion)}
          />
        ))}
      </>
    );
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose Emotion</FormLabel>
      <FormGroup>
        {sortedEmotions.map((emotion, i) => (
          <FormControlLabel
            key={i}
            control={<Switch onChange={handleOnChange} name={emotion} />}
            label={capitalize(emotion)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default EmotionControls;
