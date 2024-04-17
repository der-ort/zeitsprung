import React, { FC } from 'react';
import { DateTime } from "luxon";

interface DateControlProps {

}

// Add a prop that is currentDate, pervDate, nextDate etc...
const DateControl: FC<DateControlProps> = () => {
  return (
    <>
      <div className="date-control">
        <i data-feather="chevron-left"></i>
        <h2>{DateTime.now().toLocaleString()}</h2>
        <i data-feather="chevron-right"></i>
      </div></>
  );
};

export default DateControl;