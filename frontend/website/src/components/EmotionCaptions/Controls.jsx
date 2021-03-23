import React from "react";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

import { sortedEmotions } from "src/utils/emotions";
import { capitalize } from "src/utils/utils";

const Controls = ({ selectedEmotion, handleOnChange }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Choose Emotion</FormLabel>
      <FormGroup>
        {sortedEmotions.map((emotion, i) => (
          <FormControlLabel
            control={
              <Switch
                checked={emotion === selectedEmotion}
                onChange={handleOnChange}
                name={emotion}
              />
            }
            label={capitalize(emotion)}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default Controls;
