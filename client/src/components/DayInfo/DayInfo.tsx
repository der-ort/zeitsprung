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
  const lunarPhase = Moon.lunarPhase(moonDate, moonHemisphere).replace(/\s/g, '').toLowerCase();

  // lunar Phases as HTML unicode  
  // another option: https://github.com/tommoor/react-emoji-render
  // with a custom iconset... but for now this works...
  const lunarPhasesUTF = {
    new :               '&#x1F311;&#xFE0E;',
    waxingcrescent :    '&#x1F312;&#xFE0E;',
    firstquarter:       '&#x1F314;&#xFE0E;', 
    half:               '&#x1F313;&#xFE0E;', 
    full:               '&#x1F315;&#xFE0E;',
    waninggibbous:      '&#x1F316;&#xFE0E;',
    lastquarter:        '&#x1F317;&#xFE0E;',
    waningcrescent:     '&#x1F318;&#xFE0E;',
    crescent:           '&#x1F319;&#xFE0E;'
  }

  return (
    <>
      <div className="day-info">
        <h2>{currentDay.description}</h2>
        <MoodFace mood={currentDay.mood} />
        <span className='lunarPhase' dangerouslySetInnerHTML={{ __html: lunarPhasesUTF[lunarPhase] }}></span>
        {/* <HistoWeather day={CurrentDay} /> */}
      </div></>
  );
};

export default DayInfo;