import { FC } from 'react';
import { DateTime } from "luxon";
import { Day, Trip } from '../../models/types';
import * as FeatherIcon from 'react-feather';

// TRIP TITLE:
// Shows the basic trip info on the top left

interface TitleProps {
  trip: Trip;
  setCurrentTrip: (trip:Trip) => void;
  setCurrentDay: (day:Day) => void
}

const TripTitle: FC<TitleProps> = ({ trip, setCurrentTrip, setCurrentDay }) => {
  
  // calculate the trip timespan 
  // create a string in the format "12.03.22 - 15.06.23"
  const tripTimespan:string = DateTime.fromMillis(Number(trip.start)).toLocaleString() + ' - ' + DateTime.fromMillis(Number(trip.end)).toLocaleString()

  return (
    <>
      <div className="trip-title">
        {/* RETURN TO MAIN MENU */}
          <div className='title-chevron'>
            <FeatherIcon.ChevronLeft size={36} onClick={() => {
              setCurrentTrip(0);
              setCurrentDay(0)}}/>
          </div>

        {/* TITLE DIV */}
        <div className='title-title'>        
          <h1>{trip.name.toUpperCase()}</h1>
          {trip.description && <h2>{trip.description}</h2>}
          
          { // show the trip start and end date
            tripTimespan
          }
        </div>
      </div>    
    </>
  );
};

export default TripTitle;