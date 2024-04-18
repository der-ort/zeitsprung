import { FC } from 'react';
import { DateTime } from "luxon";
import { Trip } from '../../models/types';
import * as FeatherIcon from 'react-feather';


interface TitleProps {
  trip: Trip;
}

const TripTitle: FC<TitleProps> = ({ trip }) => {
  // create a string in the format "12.03.22 - 15.06.23"
  const tripTimespan:string = DateTime.fromMillis(trip.start).toLocaleString() + ' - ' + DateTime.fromMillis(trip.end).toLocaleString()

  function onClickHandler() {
    alert('back to main menu')
  }
  
  return (
    <>
      <div className="trip-title">
        {/* RETURN TO MAIN MENU ARROW */}
          <div className='title-chevron'>
            <FeatherIcon.ChevronLeft size={36} onClick={onClickHandler}/>
          </div>
          {/* TITLE DIV */}
        <div className='title-title'>        
          <h2>TRIP TO</h2>
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