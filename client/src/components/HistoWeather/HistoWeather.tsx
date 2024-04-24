import React, { FC, useEffect, useState } from 'react';
import { Day, Trip } from '../../models/types';
// import KeyValueTable from '../Map/KeyValueTable';
// import { getHistoWeather, reverseGeocode } from '../../api.service';
import { mockWeather_short } from '../../mockWeather';
// import { DateTime } from "luxon";
import * as FeatherIcon from 'react-feather';



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

        // commented out for demo reasons

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

  const weatherIcons = {
      "clear-day": <FeatherIcon.Sun/>,
      "clear-night": <FeatherIcon.Moon />,
      "rain": <FeatherIcon.CloudRain />,
      "snow": <FeatherIcon.CloudSnow />,
      "sleet": <FeatherIcon.CloudDrizzle />,
      "wind": <FeatherIcon.Wind />,
      "fog": <FeatherIcon.Cloud />,
      "cloudy": <FeatherIcon.Cloud />,
      "partly-cloudy-day": <FeatherIcon.Cloud />,
      "partly-cloudy-night": <FeatherIcon.Moon />,
      "thunderstorm": <FeatherIcon.CloudLightning />,
      "droplet": <FeatherIcon.Droplet />,
      "umbrella": <FeatherIcon.Umbrella />,
      "thermometer": <FeatherIcon.Thermometer />,
    };

  return (
    <>
      {loading ? (
        <p>Loading historic weather data...</p>
      ) : (
        weatherData && <span>
         <table className='weather-table'>
          <td>{weatherIcons[weatherData.summary]}<br />{weatherData.summary}</td>
          <td>{weatherIcons[weatherData.precipType]}<br /> {weatherData.precipType} </td>
          <td>{weatherIcons['thermometer']}<br />{Math.floor(Number(weatherData.temperature))} °C</td>
         </table>
        </span>
      )}
      
    </>
  );
};

export default HistoWeather;