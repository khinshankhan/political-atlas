import React from "react";

import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  dateConstraints,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        id="start"
        autoOk
        label="Start"
        value={startDate}
        format="MM/dd/yyyy"
        variant="inline"
        minDate={dateConstraints[0]}
        maxDate={endDate}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker
        id="end"
        autoOk
        label="End"
        value={endDate}
        format="MM/dd/yyyy"
        variant="inline"
        minDate={startDate}
        maxDate={dateConstraints[1]}
        onChange={(date) => setEndDate(date)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateRangePicker;
