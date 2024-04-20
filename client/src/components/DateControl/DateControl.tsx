import { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';
import { Day } from '../../models/types';

interface DateControlProps {
  currentDay:Day;
}

// DATE CONTROL MAKES YOU MOVE TO THE PREVIOUS AND NEXT DAY USING ARROW. IT ALSO SHOWS THE CURRENT DAY

const DateControl: FC<DateControlProps> = ({currentDay, setCurrentDay, currentTripDays}) => {

  // change currentDay by clicking on arrows
  function onClickHandler(action:string) {
    
    const currentIndex = currentTripDays.indexOf(currentDay);
    let newDay = currentDay;

    switch(action) {
      case 'prevDate':
        newDay = currentIndex > 0 ? currentTripDays[currentIndex - 1] : currentDay; 
        break;
      case 'nextDate':
        newDay = currentIndex < currentTripDays.length -1 ? currentTripDays[currentIndex + 1] : currentDay;
        break;
    }
    setCurrentDay(newDay);
  }

  return (
    <>
      <div className="date-control">
        <div className="date-prevnext" onClick={() => onClickHandler('prevDate')}><FeatherIcon.ChevronLeft size={36} className='date-chevron' /></div>
              <div className='date-current'>
                <h2>{DateTime.fromMillis(Number(currentDay.date)).toLocaleString()}</h2>
              </div>
        <div className="date-prevnext" onClick={() =>onClickHandler('nextDate')}><FeatherIcon.ChevronRight size={36} className='date-chevron'/></div>
      
      </div></>
  );
};

export default DateControl;