import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';

interface DateControlProps {

}



// Add a prop that is currentDate, pervDate, nextDate etc...
const DateControl: FC<DateControlProps> = ({currentDay, setCurrentDay, currentTripDays}) => {

  function onClickHandler(action:String) {
    
    const currentIndex = currentTripDays.indexOf(currentDay);
    let newDay = currentDay;

    switch(action) {
      case 'prevDate':
        //setStatus currentDate to previous in the array...
        newDay = currentIndex > 0 ? currentTripDays[currentIndex - 1] : currentDay; 
        break;
      case 'nextDate':
        newDay = currentIndex < currentTripDays.length -1 ? currentTripDays[currentIndex + 1] : currentDay;
 
        console.log('nextDate');
        break;
    }

    setCurrentDay(newDay);
  }

  return (
    <>
      <div className="date-control">
        <div className="date-prev-next" onClick={() => onClickHandler('prevDate')}><FeatherIcon.ChevronLeft size={36} className='date-chevron' /></div>
              <div className='date-current'>
                <h2>{DateTime.fromMillis(Number(currentDay.date)).toLocaleString()}</h2>
              </div>
        <div className="date-prev-next" onClick={() =>onClickHandler('nextDate')}><FeatherIcon.ChevronRight size={36} className='date-chevron'/></div>
      
      </div></>
  );
};

export default DateControl;