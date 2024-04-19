import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';
import MoodFace from '../MoodFace/MoodFace';
import { Day } from '../../models/types';


interface DayInfoProps {
  currentDay: Day;
}

// Add a prop that is currentDate / waypoint
const DayInfo: FC<DayInfoProps> = ({currentDay}) => {
  return (
    <>
      <div className="day-info">
        <h2>{currentDay.description}</h2>
        <MoodFace mood={currentDay.mood} />
      </div></>
  );
};

export default DayInfo;