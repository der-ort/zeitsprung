import { useState } from 'react'
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

function App() {

  // useState to manage the currentDay which is the day to display throughout the app.
  const [currentDay, setCurrentDay] = useState(waypoints[0].captureDate || Date.now());
  const [currentTrip, setCurrentTrip] = useState(mockTrip);


  console.log("CURRENT DAY: " + DateTime.fromMillis(currentDay).toLocaleString())

  return (
    <>
    <div className='parent'>
      <TripTitle className={"trip-title"} trip={currentTrip} />
      <Timeline className={"timeline"} waypoints={waypoints}/>
      <DateControl currentDay={currentDay}/>
      <DayInfo currentDay={currentDay}/>
      <BlogContainer />
      <BlogFooter />
      <Map className={"map"} />
      <AddAssetsButton />
    </div>
    </>
  )
}

export default App
