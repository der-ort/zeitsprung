import { FC } from 'react';
// import MoodFace from '../MoodFace/MoodFace';
import { Moon, Hemisphere } from 'lunarphase-js';
import { Day } from '../../models/types';
import HistoWeather from '../HistoWeather/HistoWeather';

interface DayInfoProps {
  currentDay: Day;
}

// DayInfo:
// Shows the description/title, historical weather and the moon phase of the day


const DayInfo: FC<DayInfoProps> = ({currentDay}) => {
  // get the current lunar phase and emoji
  function getLunarPhaseUTF() {

    // create date object
    const moonDate = new Date(Number(currentDay.date))

    // Set the hemisphere according to the current days location center
    const moonHemisphere = currentDay.locationCenter && currentDay.locationCenter[0] >= 0 ? Hemisphere.NORTHERN : Hemisphere.SOUTHERN;

    // get the actual moon phase
    const lunarPhase = Moon.lunarPhase(moonDate, moonHemisphere).replace(/\s/g, '').toLowerCase();

    // lunar Phases as HTML unicode to show as an icon
   
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

    const lunarCharacter:string = lunarPhasesUTF[lunarPhase]

    return lunarCharacter;
  }
  
  return (
    <>
      <div className="day-info">
        <span className='lunarPhase' dangerouslySetInnerHTML={{ __html: getLunarPhaseUTF() }}></span>
        
        <div className="right">
          <h4>{currentDay.description}</h4>

          {/* ADD HISTORIC WEATHER LATER */}
          <HistoWeather currentDay={currentDay} />
        </div>
      </div></>
  );
};

export default DayInfo;