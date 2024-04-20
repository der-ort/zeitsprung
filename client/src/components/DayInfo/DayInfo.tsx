import { FC } from 'react';
import MoodFace from '../MoodFace/MoodFace';
import { Moon, Hemisphere } from 'lunarphase-js';
import { Day } from '../../models/types';

interface DayInfoProps {
  currentDay: Day;
}

// DayInfo:
// Shows the description/title, mood, historical weather and the moon phase of the day


const DayInfo: FC<DayInfoProps> = ({currentDay}) => {

  // get the current lunar phase and emoji
  function getLunarPhaseUTF() {

    // create date object
    const moonDate = new Date(Number(currentDay.date))

    // Set the hemisphere according to the current days location center
    const moonHemisphere = currentDay.locationCenter && currentDay.locationCenter[0] >= 0 ? Hemisphere.NORTHERN : Hemisphere.SOUTHERN;

    // get the actual moon phase
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

    return lunarPhasesUTF[lunarPhase];
  }

  return (
    <>
      <div className="day-info">
        <h2>{currentDay.description}</h2>
        <MoodFace mood={currentDay.mood} />
        <span className='lunarPhase' dangerouslySetInnerHTML={{ __html: getLunarPhaseUTF() }}></span>
        {/* ADD HISTORIC WEATHER LATER */}
        {/* <HistoWeather day={CurrentDay} />*/}
      </div></>
  );
};

export default DayInfo;