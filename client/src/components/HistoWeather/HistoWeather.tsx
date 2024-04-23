import React, { FC, useEffect, useState } from 'react';
import { Day, Trip } from '../../models/types';
// import KeyValueTable from '../Map/KeyValueTable';
// import { getHistoWeather, reverseGeocode } from '../../api.service';
import { mockWeather_short } from '../../mockWeather';
// import { DateTime } from "luxon";


interface HistoWeatherProps {
  day: Day;
  trip: Trip;
}

const HistoWeather: FC<HistoWeatherProps> = ({ currentDay }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistoricalWeather = async () => {
      setLoading(true);
      try {
        //const histoWeather = await getHistoWeather(currentDay);

        // const beautifulWeather = {
        //   summary : histoWeather.summary,
        //   sunriseTime : DateTime.fromMillis(Number(histoWeather.sunriseTime)).toLocaleString(),
        //   sunsetTime  : DateTime.fromMillis(Number(histoWeather.sunsetTime)).toLocaleString(),
        //   moonPhase : histoWeather.moonPhase,
        //   temperatureHigh : histoWeather.temperatureHigh,
        //   temperatureLow  : histoWeather.temperatureLow,
        //   temperatureMin  : histoWeather.temperatureMin,
        //   temperatureMax  : histoWeather.temperatureMax,
        //   precipType  : histoWeather.precipType,
        //   windSpeed : histoWeather.windSpeed,
        //   pressure  : histoWeather.pressure,
        // }
        //const geoLocation = await reverseGeocode(-45.401620, -72.688644)
        
        // console.log(geoLocation.address.county + ', ' + geoLocation.address.country)
        
        // MOCK ENTRY FOR DEMO!
        // const histoWeather = mockWeather_short.daily.data[0];
        const histoWeather = mockWeather_short;
        
        setWeatherData(histoWeather);
      } catch (err) {
        console.error('Error getting historic weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalWeather();
  }, [currentDay]); // Dependency array ensures this only reruns if `day` changes

  return (
    <>
      {loading ? (
        <p>Loading historic weather data...</p>
      ) : (
        weatherData && <span>
         <table>
          <td>{weatherData.summary}</td>
          <td>{weatherData.precipType} </td>
          <td>{Math.floor(Number(weatherData.temperature))} °C</td>
         </table>
           
          
          

        </span> //<KeyValueTable data={weatherData} />
      )}
    </>
  );
};

export default HistoWeather;