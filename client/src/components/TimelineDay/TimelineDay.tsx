import React, { FC } from 'react';
import { DateTime } from "luxon";

interface TimelineDayProps {
    date: Date;
}

const TimelineDay: FC<TimelineProps> = ({date}) => {

  const formattedDate = DateTime.fromMillis(date).toFormat('dd/MM/yyyy');
  
  return (
    <>
     <div className='timeline-day'>{formattedDate}</div>  
    </>
  );
};

export default TimelineDay;