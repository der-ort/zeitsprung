import { FC } from 'react';
import { DateTime } from "luxon";
import { Day } from '../../models/types';

interface TimelineDayProps {
    day: Day;
    currentDay:Day;
}

// DAY ITEM FOR THE TIMELINE

const TimelineDay: FC<TimelineDayProps> = ({day, setCurrentDay, currentDay}) => {

  const formattedDate = DateTime.fromMillis(Number(day.date)).toLocaleString();
  
  return (
    <>
     <div className={day !== currentDay ? 'timeline-day' : 'timeline-current-day'} onClick={() => setCurrentDay(day)}>{formattedDate}</div>  
    </>
  );
};

export default TimelineDay;