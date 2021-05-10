import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { default as MuiAutocomplete } from "@material-ui/lab/Autocomplete";

const NormalizedAutocomplete = withStyles({
  inputRoot: {
    '&&[class*="MuiOutlinedInput-root"] $input': {
      padding: 8,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
  },
  input: {},
})(MuiAutocomplete);

const Autocomplete = ({ value, onChange, options, renderInput, ...props }) => {
  return (
    <div style={{ display: "inline-flex" }}>
      <NormalizedAutocomplete
        {...props}
        options={options}
        value={value}
        onChange={onChange}
        autoHighlight
        getOptionLabel={(option) => option}
        renderOption={(option) => <>{option}</>}
        renderInput={renderInput}
      />
    </div>
  );
};

export default Autocomplete;
