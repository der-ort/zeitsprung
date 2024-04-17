import React, { FC } from 'react';
import { DateTime } from "luxon";


interface DayInfoProps {
  currentDay: Date;
}

// Add a prop that is currentDate / waypoint
const DayInfo: FC<DayInfoProps> = ({currentDay}) => {
  return (
    <>
      <div className="day-info">
        <h2>TODAY</h2>
        <h2>{DateTime.fromMillis(currentDay).toLocaleString()}</h2>
      </div></>
  );
};

export default DayInfo;