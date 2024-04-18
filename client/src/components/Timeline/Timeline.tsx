import React, { FC } from 'react';
import TimelineDay from '../TimelineDay/TimelineDay';
import { Day } from '../../models/types';

interface TimelineProps {
    currentTripDays: Day[]
}

const Timeline: FC<TimelineProps> = ({currentTripDays}) => {
  return (
    <>
       <div className='timeline'>
            {currentTripDays.map((day) => {
              return <TimelineDay key={day.id} date={day.date} />  
            })}
       </div>
    </>
  );
};

export default Timeline;