import { FC } from 'react';
import { DateTime } from "luxon";

interface TimelineDayProps {
    date: Date;
}

const TimelineDay: FC<TimelineDayProps> = ({date}) => {

  const formattedDate = DateTime.fromMillis(Number(date)).toLocaleString();
  
  return (
    <>
     <div className='timeline-day'>{formattedDate}</div>  
    </>
  );
};

export default TimelineDay;