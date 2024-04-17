import React, { FC } from 'react';
import TimelineDay from '../TimelineDay/TimelineDay';

interface TimelineProps {
    days: Date[];
}

const Timeline: FC<TimelineProps> = ({waypoints}) => {
  return (
    <>
       <div className='timeline'>
            {waypoints.map((waypoint) => {
              return <TimelineDay key={waypoint.id} date={waypoint.captureDate} />  
            })}
       </div>
    </>
  );
};

export default Timeline;