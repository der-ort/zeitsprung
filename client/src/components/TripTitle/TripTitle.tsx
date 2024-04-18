import { FC } from 'react';
import { DateTime } from "luxon";
import { Trip } from '../../models/types';


interface TitleProps {
  trip: Trip;
  title: string;
  subtitle?: string;
}

const TripTitle: FC<TitleProps> = ({ trip, title, subtitle }) => {
  console.log(trip)
  // create a string in the format "12.03.22 - 15.06.23"
  const tripTimespan:string = DateTime.fromMillis(trip.start).toLocaleString() + ' - ' + DateTime.fromMillis(trip.end).toLocaleString()
  console.log(tripTimespan);
  return (
    <>
      <div className="trip-title">
        <h2>TRIP TO</h2>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        
        { // show the trip start and end date
          tripTimespan
        }
      </div>    
    </>
  );
};

export default TripTitle;