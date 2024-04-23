import React, { FC } from 'react';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';
import MoodFace from '../MoodFace/MoodFace';
import { Day } from '../../models/types';
import KeyValueTable from '../Map/KeyValueTable';


// REWRITE THIS -> SHOULD GO ON SERVER; IT CAN TAKE A TIMESPAN AND NOT ONLY A POINT IN TIME
// CAN BE FETCHED ONCE AND THEN BE STORED IN THE DB as an object inside the trip!

interface HistoWeatherProps {
  day: Day;
  trip: Trip;
}

// Takes the current day and fetches the historical weather data for the place and day
// https://open-meteo.com/en/docs/historical-weather-api
// decided for openweathermap -> put API key to env variable



function async getHistoricalWeather (day) {

    const [lat, lon] = [...day.coordinates]
    
    const API_Key = '3d8383e9e1e7bcbeadd072ba94dd6069'

    const apiURL = `https://history.openweathermap.org/data/2.5/history/city?`;
    
    // get lat, lon and unix timestamp from day object
         
    // construct API query
    const query =  apiURL + `lat=${lat}&lon=${lon}&type=hour&start=${day.date}&appid=${API_key}`;

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
const HistoWeather: FC<HistoWeatherProps> = ({getHistoricalWeather}) => {
  return (
    <>
        {KeyValueTable(gethisto)}
    </>
  );
};

export default HistoWeather;