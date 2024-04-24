import { useEffect, useState } from 'react'
import './App.css'
import TripTitle from './components/TripTitle/TripTitle'
import Map from './components/Map/Map'
import Timeline from './components/Timeline/Timeline'
import DateControl from './components/DateControl/DateControl'
import DayInfo from './components/DayInfo/DayInfo'
import BlogContainer from './components/BlogContainer/BlogContainer'
import AddNewDayButton from './components/AddNewDayButton/AddNewDayButton'
import AddAssetsButton from './components/AddAssetsButton/AddAssetsButton'
import AddAssetsForm from './components/AddAssetsForm/AddAssetsForm'
import TripList from './components/TripList/TripList'
import BackgroundMap from './components/BackgroundMap/BackgroundMap'
import { Day } from './models/types'

// emptyDay mockdata

const emptyDay = {
  date: Date.now(),
  id: 3,
  mood: 2,
  locationCenter: [51.50,-0.09]
}

function App() {

  // HARDCODED MOCK USER
  const userId:number = 123;

  // --------------- STATES

  // disable linting since user management is not implemented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUserId, setCurrentUserId] = useState(userId);
  
  // currentUserTrips
  const [currentUserTrips, setCurrentUserTrips] = useState([]);
  
  // currentTrip
  const [currentTrip, setCurrentTrip] = useState(0);
  
  // currentTripDays
  const [currentTripDays, setCurrentTripDays] = useState([]);

  // defines the assets being shown on the map and the blogpost on the left
  const [currentDay, setCurrentDay] = useState(null);
  
  // currentAssets
  const [currentAssets, setCurrentAssets] = useState([]);
  
  // uploadMode
  const [uploadMode, setUploadMode] = useState(false);

  // --------------- END OF STATES

  // --------------- EFFECTS

  // TO DO: MIGRATE THE EMBEDDED FUNCTIONS TO THE API.SERVICES.tsx
  // remove the hardcoded links and add them to an .env file

  // GET ALL TRIPS FOR THE CURRENT USER
  useEffect(() => {

    const fetchCurrentUserTrips = async (userId) => {
    
      try {
        const query = `http://127.0.0.1:3000/user/${userId}/trips`;
        const response = await fetch(query);
    
        if (!response.ok) throw new Error('Network error while fetching Days.');
    
        const trips = await response.json();
        setCurrentUserTrips(trips);
    
      } catch (error) {
        console.error('Failed to user trips:', error);
      }
    };
    fetchCurrentUserTrips(currentUserId);
  }, [currentUserId]);


  // GET ALL DAYS FOR THE CURRENT TRIP
  useEffect(() => { 
    const fetchCurrentTripDays = async (tripId:number):Day[] => {
      try {
        const query = `http://127.0.0.1:3000/trips/${Number(tripId)}/days`;

        const response = await fetch(query);
        if (!response.ok) throw new Error('Network error while fetching Days.');

        const days:Day[] = await response.json();

        setCurrentTripDays(days);

      } catch (error) {
        console.error('Failed to fetch trip days:', error);
      }
    };
    if (currentTrip) fetchCurrentTripDays(currentTrip.id);
  }, [currentTrip]);


  // SET THE CURRENT DAY
  useEffect(() => {
    if (!currentDay && currentTripDays) currentTripDays[0] ? setCurrentDay(currentTripDays[0]) : setCurrentDay(emptyDay);
  }, [currentTripDays])

  
  const fetchCurrentDayAssets = async (dayId:number) => {
    try {
      const query = `http://127.0.0.1:3000/assets/day/${dayId}`;
      const response = await fetch(query);
      
      if (!response.ok) throw new Error('Network error while fetching day assets.');
      
      const assets = await response.json();
      setCurrentAssets(assets);
    
    } catch (error) {
      console.error('Failed to fetch trip days:', error);
    }
  };

  // GET ALL ASSETS FOR THE CURRENT DAY
  useEffect(() => {
    if (currentDay) {
      fetchCurrentDayAssets(currentDay.id);
    }  
  }, [currentDay]);

  // --------------- EFFECTS

  return (
    <>
    {/* a map background with alternating locations */}
    {!currentTrip ? <BackgroundMap /> : null}

    {/* conditional rendering of trip selector, trip creation and actual trip view */}
    {/* if a trip is selected show the trip view -> TO DO: migrate these to its own component to clean this page up */}
    {currentTrip? 

    <div className='parent'>
      

      <TripTitle        className={"trip-title"} 
                        trip={currentTrip} 
                        setCurrentTrip={setCurrentTrip} 
                        setCurrentDay={setCurrentDay}
      />
      

      <Timeline         className={"timeline"} 
                        currentTripDays={currentTripDays} 
                        setCurrentDay={setCurrentDay} 
                        currentDay={currentDay}
      />
      

      <DateControl      currentDay={currentDay} 
                        setCurrentDay={setCurrentDay} 
                        currentTripDays={currentTripDays}
      />
      

      <DayInfo          currentDay={currentDay} />
      

      <BlogContainer    currentDay={currentDay} 
                        setCurrentDay={setCurrentDay} 
                        currentTrip={currentTrip} 
                        setCurrentTrip={setCurrentTrip} 
                        currentTripDays={currentTripDays}
      />


      <AddNewDayButton setCurrentDay={setCurrentDay} 
                       currentTrip={currentTrip} 
                       currentTripDays={currentTripDays}
                       setCurrentTripDays={setCurrentTripDays} 
      />


      <Map className={"map"} 
           currentAssets={currentAssets}
      />


      {/* ASSET BUTTON */}

        {/* show add assets only when "uploadMode" is true. -> useState*/}
      
        {uploadMode && <AddAssetsForm setUploadMode={setUploadMode} 
                                      currentTrip={currentTrip} 
                                      setCurrentDay={setCurrentDay} 
                                      currentDay={currentDay} 
                                      setCurrentTrip={setCurrentTrip}
                                      setCurrentAssets={setCurrentAssets}
                                      currentUserId={currentUserId} 
                                      setCurrentAssets={setCurrentAssets}
                                      currentAssets = {currentAssets}
                                      fetchCurrentDayAssets={fetchCurrentDayAssets}

                        />}  
      
        {/* show add assets button only when "uploadMode" is false. -> useState*/}
        <AddAssetsButton setUploadMode={setUploadMode} 
                         uploadMode={uploadMode}
                         setCurrentAssets={setCurrentAssets }
        />
    
    </div>
    
    : 
    
    // Show trip list if no trip is selected
    <TripList currentUserTrips={currentUserTrips} 
              setCurrentTrip={setCurrentTrip} 
              currentUserId={currentUserId} 
    />
    }
    </>
  )
}

export default App
