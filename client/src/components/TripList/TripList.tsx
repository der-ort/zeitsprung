import { FC, useState } from 'react';
import TripListItem from '../TripListItem/TripListItem';
import NewTripButton from './NewTripButton';
import AddTripForm from '../AddTripForm/AddTripForm';

// LANDING PAGE TO SHOW THE TRIPS FOR THE CURRENT USER
// TO DO:
// - ADD TRIP function

interface TripListProps {
  userId:number;
}

const TripList: FC<TripListProps> = ({currentUserTrips, setCurrentTrip, currentUserId}) => {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editTrip, setEditTrip] = useState(false);
  
  return (
    <> 
      {editTrip ? (
        <div className="triplist-wrapper">
          <AddTripForm setEditTrip={setEditTrip} setCurrentTrip={setCurrentTrip} currentUserId={currentUserId}/>
        </div>
      ) : (
        <div className="triplist-wrapper">
          <h2>Hi User #{currentUserId}!</h2>
          <h2>SELECT YOUR TRIP:</h2>
          <div className='triplist'>
            {currentUserTrips.map((trip) => (
              <TripListItem key={trip.id} setCurrentTrip={setCurrentTrip} trip={trip} />
            ))}
              <NewTripButton setEditTrip={setEditTrip}  setCurrentTrip={setCurrentTrip}/>
          </div>
          <h4>TRIPSITTER 2024</h4>
        </div>
      )}
    </>
  );
};

export default TripList;