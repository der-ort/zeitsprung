import React, { FC, useEffect, useState } from 'react';
import { Day, Trip } from '../../models/types';
// import KeyValueTable from '../Map/KeyValueTable';
import { getHistoWeather } from '../../api.service';
// import { mockWeather_short } from '../../mockWeather';
import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';



interface HistoWeatherProps {
    day: Day;
    trip: Trip;
    currentDay: Day
}

const HistoWeather: FC<HistoWeatherProps> = ({ currentDay }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistoricalWeather = async () => {
      setLoading(true);
      try {

        // commented out for demo reasons

        const rawWeather = await getHistoWeather(currentDay);

        const histoWeather = rawWeather.daily;
  
       setWeatherData(histoWeather);
  
      } catch (err) {
        console.error('Error getting historic weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalWeather();
  }, [currentDay]); // Dependency array ensures this only reruns if `day` changes

  // weather icons to show according to the returned string
  const weatherIcons = {
      "clear-day": <FeatherIcon.Sun size={16}/>,
      "clear-night": <FeatherIcon.Moon size={16}/>,
      "rain": <FeatherIcon.CloudRain size={16}/>,
      "snow": <FeatherIcon.CloudSnow size={16}/>,
      "sleet": <FeatherIcon.CloudDrizzle size={16}/>,
      "wind": <FeatherIcon.Wind size={16}/>,
      "fog": <FeatherIcon.Cloud size={16}/>,
      "cloudy": <FeatherIcon.Cloud size={16}/>,
      "partly-cloudy-day": <FeatherIcon.Cloud size={16}/>,
      "partly-cloudy-night": <FeatherIcon.Moon size={16}/>,
      "thunderstorm": <FeatherIcon.CloudLightning size={16}/>,
      "droplet": <FeatherIcon.Droplet size={16}/>,
      "umbrella": <FeatherIcon.Umbrella size={16}/>,
      "thermometer": <FeatherIcon.Thermometer size={16}/>,
    };

  return (
    <>
      {loading ? (
        <p>Loading historic weather data...</p>
      ) : (
        weatherData && <span>
         <table className='weather-table'>
         <td>
            <FeatherIcon.Clock size={16} /> <br />
            &#8673;&nbsp;
              {DateTime.fromISO(weatherData.sunrise).toFormat('HH:mm')}
            <br />
            &#8675;&nbsp;
              {DateTime.fromISO(weatherData.sunset).toFormat('HH:mm')}
          </td>
          <td>{weatherIcons['clear-day']}<br />{Math.round(weatherData.sunshine_duration / 3600)} h</td>
          <td>{weatherIcons['umbrella']}<br /> {weatherData.precipitation_sum} mm <br/> {weatherData.precipitation_hours} h  </td>
          <td>{weatherIcons['thermometer']}<br />{weatherData.temperature_2m_min} °C <br /> {weatherData.temperature_2m_max} °C</td>
         </table>
        </span>
      )}
      
    </>
  );
};

export default HistoWeather;