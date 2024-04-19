import React, { FC } from 'react';
import TripListItem from '../TripListItem/TripListItem';
import BackgroundMap from '../BackgroundMap/BackgroundMap';

interface TripListProps {
}

const TripList: FC<TripListProps> = ({currentUserTrips, setCurrentTrip, userId}) => {
  return (
    <>
    <div className="triplist-wrapper">
      <h2>Hi User #{userId}!</h2>
      <h2>SELECT YOUR TRIP:</h2>
       <div className='triplist'>
            {currentUserTrips.map((trip) => {
              return <TripListItem key={trip.id} setCurrentTrip={setCurrentTrip} trip={trip} />  
            })}
       </div>
       <h4>TRIPSITTER 2024</h4>
       </div>
    </>
  );
};

export default TripList;