import React, { useState } from 'react';
import * as FeatherIcon from 'react-feather';
import { createDays, createTrip } from '../../api.service';
import { Trip } from '../../models/types';
// import { DateTime } from "luxon";

// Define the initial state based on the Trip interface, excluding the method and optional fields


interface AddTripFormProps {
}


const AddTripForm: FC<AddTripFormProps> = ({setEditTrip, setCurrentTrip, currentUserId}) => {
  
  const defaultTrip = {
  //id handling: do not pass an id and it gets created by sequelize :)
    authorId: currentUserId,
    name: '',
    description: '',
    locationCenter: [0,0],
    start: Date.now(),
    end: Date.now()
  };
  
  // STATE
  const [trip, setTrip] = useState(defaultTrip);
  const [autoCreateDays, setAutoCreateDays] = useState(false);
  
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
      if (name === "autoCreateDays") {
        setAutoCreateDays(!autoCreateDays);
      }

      setTrip(newTrip);  
    };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('creating Trip:', trip);

    // convert date to timestamp:
    const convertedStart = new Date(trip.start).getTime();
    const convertedEnd = new Date(trip.end).getTime();

    const newTrip = {...trip, start: convertedStart, end: convertedEnd}
    console.log('newTrip')
    console.log(newTrip)

    // create new trip on server
    try {
      
      // create a new trip and get the Trip object:
      const createdTrip:Trip = await createTrip(currentUserId, newTrip);
      
      // set the trip to the newly created trip to update the view
      setCurrentTrip(createdTrip);
      
      // Create days for the trip automatically if checkbox is checked!

      if (autoCreateDays) createDays(createdTrip);

      // update the trip list
      

    } catch (err) {
      console.error('Error creating Trip: ' + err + 'when creating ' + trip )
    }
    
};

  return (<>
    <h2>new trip</h2>
    
    <form onSubmit={handleSubmit} className='addtrip-form'>
        <label htmlFor='name'>Name:</label>
        <input required
          type="text"
          name="name"
          maxLength="75"
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

        <label htmlFor='end'>End:</label>
        <input required
          type="date"
          name="end"
          value={trip.end}
          onChange={handleChange}
        />

      <div className='checkbox-group'>
        <input type='checkbox' name='autoCreateDays' onChange={handleChange}/> 
        <label htmlFor='autoCreateDays'> automatically create days</label>
        
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