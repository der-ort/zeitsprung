import { FC } from 'react';
import TimelineDay from '../TimelineDay/TimelineDay';
import { Day } from '../../models/types';

interface TimelineProps {
    currentTripDays: Day[];
    currentDay:Day;
    setCurrentDay: (day:Day) => void;
}

// TIMELINE ON TOP OF THE PAGE
// A COLLECTION OF DIVS THAT REPRESENT THE DAYS OF THE TRIP 

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