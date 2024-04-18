import { useEffect, useState } from 'react'
import './App.css'
import TripTitle from './components/TripTitle/TripTitle'
import Map from './components/Map/Map'
import Timeline from './components/Timeline/Timeline'
import { DateTime, Interval } from "luxon";
import DateControl from './components/DateControl/DateControl'
import DayInfo from './components/DayInfo/DayInfo'
import BlogContainer from './components/BlogContainer/BlogContainer'
import BlogFooter from './components/BlogFooter/BlogFooter'
import AddAssetsButton from './components/AddAssetsButton/AddAssetsButton'
import { Asset, Trip, Waypoint } from './models/types' // import Typescript types

// MOCK DATA -> FINAL DATA NEEDS TO BE SORTED BY TIMESTAMP!!!

// mock waypoints
export const waypoints: Waypoint[] = [
  {
      id: 1,
      description: 'oh my god',
      imageURL: './assets/images/michi_1.jpg',
      captureDate: 1713361418381, 
      coordinates: [51.500, -0.10]
  },
  {
      id: 2,
      description: 'this is so amazing',
      imageURL: './assets/images/michi_2.jpg',
      captureDate: 1713361432389, 
      coordinates: [51.505, -0.09]
  },
  {
      id: 3,
      description: 'and i love the beach so much',
      imageURL: './assets/images/michi_3.jpg',
      captureDate: 1713361424389, 
      coordinates: [51.51, -0.08]
  },
  {
    id: 4,
    description: 'and i love the beach so much',
    imageURL: './assets/images/michi_4.jpg',
    captureDate: 1613251424389, 
    coordinates: [51.51, -0.08]
  },
  {
    id: 5,
    description: 'and i love the beach so much',
    imageURL: './assets/images/michi_5.jpg',
    captureDate: 1711561424389, 
    coordinates: [51.51, -0.11]
  },
  {
    id: 6,
    description: 'and i love the beach so much',
    imageURL: './assets/images/michi_6.jpg',
    captureDate: 911561424389, 
    coordinates: [52.51, -0.09]
  },
  {
    id: 7,
    description: 'and i love the beach so much',
    imageURL: './assets/images/michi_7.jpg',
    captureDate: 1111561424389, 
    coordinates: [49.51, -0.08]
  },
  {
    id: 8,
    description: 'and i love the beach so much',
    imageURL: './assets/images/michi_8.jpg',
    captureDate: 1211561424389, 
    coordinates: [50.51, -0.08]
  },
  {
    id: 9,
    description: 'and i love the beach so much',
    imageURL: './assets/images/michi_9.jpg',
    captureDate: 1711561424389, 
    coordinates: [51.11, -0.04]
  }
]

// mock Assets

const assets:Asset[] = [
  { 
  id: 1,
  description: 'super',
  assetType: 'image',
  fileLocation: './assets/images/michi_9.jpg', 
  coordinates: [51.11, -0.04], 
  captureDate: 1711561424389,
  associatedDate: 1711561424389,  
  associatedTrips: 1
  },
  { 
  id: 2,
  description: 'top',
  assetType: 'image',
  fileLocation: './assets/images/michi_8.jpg', 
  coordinates: [51.11, -0.04], 
  captureDate: 1711561424389,
  associatedDate: 1711561424389,  
  associatedTrips: 1
  },
  { 
  id: 3,
  description: '1A',
  assetType: 'image',
  fileLocation: './assets/images/michi_7.jpg', 
  coordinates: [51.11, -0.04], 
  captureDate: 1711561424389,
  associatedDate: 1711561424389,  
  associatedTrips: 1
  }
]

const mockTrip:Trip = {
  id: 1,
  name: 'Michimahuida',
  description: 'REGIÓN PALENA, CHILE',
  locationCenter: [51.51, -0.08],
  start: 1711561224389,
  end: 1711561424389,
  length: () => Interval.fromDateTimes(this.start, this.end) 
}

const userId:number = 123;
const tripId:number = 3;
let dayId:number = 1;

function App() {
  // useState to manage the currentDay which is the day to display throughout the app
  // defines the assets being shown on the map and the blogpost on the left
  const [currentDay, setCurrentDay] = useState(waypoints[0].captureDate || Date.now());
  // currentTrip
  const [currentTrip, setCurrentTrip] = useState(mockTrip);
  // currentTripDays
  const [currentTripDays, setCurrentTripDays] = useState([]);
  // currentAssets
  const [currentAssets, setCurrentAssets] = useState([])


  // SET THE EFFECTS

  // GET ALL DAYS FOR THE CURRENT TRIP
  useEffect(() => {
    const fetchCurrentTripDays = async (tripId) => {
      try {
        const query = `http://127.0.0.1:3000/trips/${tripId}/days`;
        const response = await fetch(query);
        if (!response.ok) throw new Error('Network error while fetching Days.');
        const days = await response.json();
        setCurrentTripDays(days);
      } catch (error) {
        console.error('Failed to fetch trip days:', error);
      }
    };
    fetchCurrentTripDays(tripId);
  }, [tripId]);


  // GET ALL ASSETS FOR THE CURRENT DAY
  useEffect(() => {
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
    fetchCurrentDayAssets(dayId);
  }, [dayId]);


  console.log(currentAssets)
  // TO DO: change currentDay from timestamp to Day Type

  return (
    <>
    <div className='parent'>
      <TripTitle className={"trip-title"} trip={currentTrip} />
      <Timeline className={"timeline"} currentTripDays={currentTripDays} />
      <DateControl currentDay={currentDay}/>
      <DayInfo currentDay={currentDay}/>
      <BlogContainer currentDay={currentDay} />
      <BlogFooter />
      <Map className={"map"} currentAssets={currentAssets} />
      <AddAssetsButton />
    </div>
    </>
  )
}

export default App
