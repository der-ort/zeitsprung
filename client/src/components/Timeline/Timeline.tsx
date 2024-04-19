import React, { FC } from 'react';
import TimelineDay from '../TimelineDay/TimelineDay';
import { Day } from '../../models/types';

interface TimelineProps {
    currentTripDays: Day[]
}

const Timeline: FC<TimelineProps> = ({currentTripDays, setCurrentDay, currentDay}) => {
  return (
    <>
       <div className='timeline'>
            {currentTripDays && currentTripDays.map((day) => {
              return <TimelineDay key={day.id} day={day} setCurrentDay={setCurrentDay} currentDay={currentDay} />  
            })}
       </div>
    </>
  );
};

export default Timeline;