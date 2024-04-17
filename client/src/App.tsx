import { useState } from 'react'
import './App.css'
import TripTitle from './components/TripTitle/TripTitle'
import Map from './components/Map/Map'
import Timeline from './components/Timeline/Timeline'
import { DateTime } from "luxon";
import DateControl from './components/DateControl/DateControl'
import DayInfo from './components/DayInfo/DayInfo'
import BlogContainer from './components/BlogContainer/BlogContainer'
import BlogFooter from './components/BlogFooter/BlogFooter'

// MOCK DATA -> FINAL DATA NEEDS TO BE SORTED BY TIMESTAMP!!!
export const waypoints = [
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

function App() {

  // useState to manage the currentDay which is the day to display throughout the app.
  const [currentDay, setCurrentDay] = useState(waypoints[0].captureDate || Date.now())

  console.log("CURRENT DAY: " + DateTime.fromMillis(currentDay).toLocaleString())

  return (
    <>
    <div className='parent'>
      <TripTitle className={"trip-title"} title={"Hello"} subtitle={"Bye"}/>
      <Timeline className={"timeline"} waypoints={waypoints}/>
      <DateControl currentDay={currentDay}/>
      <DayInfo currentDay={currentDay}/>
      <BlogContainer />
      <BlogFooter />
      <Map className={"map"} />
    </div>
    </>
  )
}

export default App
