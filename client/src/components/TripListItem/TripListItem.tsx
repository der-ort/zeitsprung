import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';
import { Trip } from '../../models/types';

interface TripListItemProps {
   trip:Trip;
}

const TripListItem: FC<TripListItemProps> = ({trip, setCurrentTrip}) => {
  return (
    <>
       <div className='triplist-item' onClick={() => setCurrentTrip(trip)}>
          <h2>{trip.name}</h2>
          {/* ADD LOCATION GATHERED VIA NOMINATIM */}
          <p></p>

          {/* SHOW DURATION */}
          <p><FeatherIcon.Clock size={16} />  &nbsp;  {DateTime.fromMillis(Number(trip.start)).toLocaleString()}&nbsp;  <br/>
          <FeatherIcon.ArrowRight size={16} />  &nbsp;  {DateTime.fromMillis(Number(trip.end)).toLocaleString()}</p>
          <FeatherIcon.XSquare size={16} className='delete-trip'/>
       </div>
    </>
  );
};

export default TripListItem;