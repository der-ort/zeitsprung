import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';
import MoodFace from '../MoodFace/MoodFace';
import { Day } from '../../models/types';


// REWRITE THIS -> SHOULD GO ON SERVER; IT CAN TAKE A TIMESPAN AND NOT ONLY A POINT IN TIME
// CAN BE FETCHED ONCE AND THEN BE STORED IN THE DB as an object inside the trip!

interface HistoWeatherProps {
  day: Day;
  trip: Trip;
}

// Takes the current day and fetches the historical weather data for the place and day
// https://open-meteo.com/en/docs/historical-weather-api
// up to 10k calls per day are free


function async getHistoricalWeather (day) {
    const [lat, lon] = [...day.coordinates]
    
    const params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": "2024-04-03",
        "end_date": "2024-04-17",
        "hourly": "temperature_2m"
    };

    const apiURL = 'https://archive-api.open-meteo.com/v1/archive';
    
    // get lat, lon and unix timestamp from day object
    
    const dt = day.date; // date in unix timestamp = milliseconds
    
    // construct API query
    const query =  apiURL + `lat=${lat}&lon=${lon}&dt=${dt}&appid=${API key}'`;

    console.log('fetching historic weather data:');
    console.log(query);

    try {
    const response = await fetch(query);
    const historicWeather = await response.json();

    return historicWeather;
    } catch (err) {
        console.error('Error fetching historic weather for ' + day.coordinate + ' on the ' + DateTime.fromMillis(day.date).toLocaleString)
        return [];
    }
}

// Add a prop that is currentDate / waypoint
const HistoWeather: FC<HistoWeatherProps> = ({day}) => {
  return (
    <>
        {weatherIcons[weather]}
    </>
  );
};

export default HistoWeather;