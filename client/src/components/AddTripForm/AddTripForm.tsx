import React, { useState } from 'react';
import * as FeatherIcon from 'react-feather';
import { createTrip } from '../../api.service';
import { Trip } from '../../models/types';
// import { DateTime } from "luxon";

// Define the initial state based on the Trip interface, excluding the method and optional fields


interface AddTripFormProps {
}


const AddTripForm: FC<AddTripFormProps> = ({setEditTrip, setCurrentTrip, currentUserId}) => {
  const [trip, setTrip] = useState(defaultTrip);

  const defaultTrip:Trip = {
    id:0, //how to handle the id? -> create empty trip and then get the id from the database?
    authorId: currentUserId,
    name: '',
    description: '',
    locationCenter: [0,0],
    start: Date.now(),
    end: Date.now()
  };

  let newTrip = {...trip};
  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
      if (name === "name") newTrip = { ...newTrip, name: value};
      if (name === "description") newTrip = { ...newTrip, description: value};
      if (name === "start") newTrip = { ...newTrip, start:  value};
      if (name === "end") {
        // ADD check for start < enddate and vice versa
        newTrip = { ...newTrip, end: value} // when submitting and there is no value default to start date later
      }
        setTrip(newTrip);  
      console.log(trip);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('creating Trip:', trip);


    // create new trip on server
    const createdTrip:Trip = createTrip(currentUserId, trip)
    // upload it to the server

    // on success set current trip to the new trip -> will automatically toggle to the trip view

    setCurrentTrip(createdTrip)
    // ADD FUNCTION TO CREATE TRIP, THEN SET IT TO BE THE CURRENT TRIP!
    // Create days for the trip length!

};

  return (<>
    <h2>new trip</h2>
    
    <form onSubmit={handleSubmit} className='addtrip-form'>
        <label htmlFor='name'>Name:</label>
        <input required
          type="text"
          name="name"
          maxlength="75"
          value={trip.name}
          onChange={handleChange}
        />

        <label htmlFor='description'>Description:</label>
        <textarea required
          name="description"
          value={trip.description}
          onChange={handleChange}
        />

        <label htmlFor='start'>Start:</label>
        <input required
          type="date"
          name="start"
          value={trip.start}
          onChange={handleChange}
        />

        <label htmlhtmlFor='end'>End:</label>
        <input required
          type="date"
          name="end"
          value={trip.end}
          onChange={handleChange}
        />

      <div className='checkbox-group'>
        <input type='checkbox' name='autoDayPopulation' onChange={handleChange}/> 
        <label htmlFor='autoDayPopulation'> automatically create days</label>
        
      </div>

      <div className="button-group">
        <button onClick={() => setEditTrip(false)}><FeatherIcon.X size={48} color='#aaaaaa'/></button>
        <button type="submit"><FeatherIcon.ArrowRight size={48}/></button>
      </div>
    </form>
    </>
  );
};

export default AddTripForm;