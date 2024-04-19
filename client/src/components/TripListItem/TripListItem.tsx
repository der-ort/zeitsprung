import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';

interface TripListItemProps {
}

const TripListItem: FC<TripListItemProps> = ({trip, setCurrentTrip}) => {
  return (
    <>
       <div className='triplist-item' onClick={() => setCurrentTrip(trip)}>
          <h2>{trip.name}</h2>
          {/* ADD LOCATION GATHERED VIA NOMINATIM */}
          <p></p>

          {/* SHOW DURATION */}
          <p><FeatherIcon.Clock size={16} /> {DateTime.fromMillis(Number(trip.start)).toLocaleString()} <br/>
             <FeatherIcon.ArrowRight size={16} /> {DateTime.fromMillis(Number(trip.end)).toLocaleString()}
          </p>
       </div>
    </>
  );
};

export default TripListItem;