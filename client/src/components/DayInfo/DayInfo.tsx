import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';
import MoodFace from '../MoodFace/MoodFace';
import { Moon, Hemisphere } from 'lunarphase-js';
import { Day } from '../../models/types';


interface DayInfoProps {
  currentDay: Day;
}



// Add a prop that is currentDate / waypoint
const DayInfo: FC<DayInfoProps> = ({currentDay}) => {

  // get the current lunar phase and emoji
  const moonDate = new Date(Number(currentDay.date))
  const moonHemisphere = currentDay.locationCenter && currentDay.locationCenter[0] >= 0 ? Hemisphere.NORTHERN : Hemisphere.SOUTHERN;
  const phaseEmoji = Moon.lunarPhaseEmoji(moonDate, moonHemisphere);

  return (
    <>
      <div className="day-info">
        <h2>{currentDay.description}</h2>
        <MoodFace mood={currentDay.mood} />
        {phaseEmoji}
        {/* <HistoWeather day={CurrentDay} /> */}
      </div></>
  );
};

export default DayInfo;