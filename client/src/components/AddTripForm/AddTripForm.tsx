import React, { useState } from 'react';
import * as FeatherIcon from 'react-feather';

// Define the initial state based on the Trip interface, excluding the method and optional fields
const defaultTrip = {
  id: 0,
  name: '',
  description: '',
  locationCenter: [],
  start: Date.now(),
  end: Date.now()
};

interface AddTripFormProps {
}


const AddTripForm: FC<AddTripFormProps> = ({setEditTrip}) => {
  const [trip, setTrip] = useState(defaultTrip);

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "locationCenter") {
      setTrip(prevTrip => ({ ...prevTrip, locationCenter: value.split(',').map(Number) }));
    } else {
      setTrip(prevTrip => ({ ...prevTrip, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Trip Data:', trip);

    // ADD FUNCTION TO CREATE TRIP, THEN SET IT TO BE THE CURRENT TRIP!

};

  return (<>
    <h2>new trip</h2>
    
    <form onSubmit={handleSubmit} className='addtrip-form'>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={trip.name}
          onChange={handleChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={trip.description}
          onChange={handleChange}
        />
        <label>Start:</label>
        <input
          type="date"
          name="start"
          value={trip.start}
          onChange={handleChange}
        />

        <label>End:</label>
        <input
          type="date"
          name="end"
          value={trip.end}
          onChange={handleChange}
        />
      <div className="button-group">
        <button onClick={() => setEditTrip(false)}><FeatherIcon.X size={48} color='#aaaaaa'/></button>
        <button type="submit"><FeatherIcon.ArrowRight size={48}/></button>
      </div>
    </form>
    </>
  );
};

export default AddTripForm;