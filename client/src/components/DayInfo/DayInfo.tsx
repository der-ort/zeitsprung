import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';


interface DayInfoProps {
  currentDay: Date;
}

// Add a prop that is currentDate / waypoint
const DayInfo: FC<DayInfoProps> = ({currentDay}) => {
  return (
    <>
      <div className="day-info">
        <h2>SCHÖNER TAG</h2>
        <FeatherIcon.Cloud size="48"/>
        <FeatherIcon.Moon size="48"/>
        <FeatherIcon.Smile size="48"/>
      </div></>
  );
};

export default DayInfo;