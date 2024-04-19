import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';

interface DateControlProps {

}



// Add a prop that is currentDate, pervDate, nextDate etc...
const DateControl: FC<DateControlProps> = ({currentDay, setCurrentDay}) => {

  function onClickHandler(action:String) {
    switch(action) {
      case 'prevDate':
        //setStatus currentDate to previous in the array...
        console.log('prevDate');
        break;
      case 'nextDate':
          //setStatus currentDate to next in the array...
          console.log('nextDate');
          break;
    }
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