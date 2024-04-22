import { DateTime } from "luxon";

	
// THIS IS AN EXAMPLE FILE FROM OPENMETEO
// ADJUST TO FIT THE NEEDS OF THIS APPLICATION
// SHOULD IT GO TO ON THE SERVER?

// parameters for the openmeteo API
// lat + lon
// date as a unix timestamp
function async getHistoWeather ([lat, lon], timestamp) {
	
const date = DateTime.fromMillis(timestamp).toFormat('YYYY-MM-DD');

const url = 'https://api.open-meteo.com/v1/history';
const params = {
	"latitude": `"${lat}"`,
	"longitude": `"${lon}"`,
	"start_date": `"${date}"`,
	"end_date": `"${date}"`,
	"daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "temperature_2m_mean", "apparent_temperature_max", "apparent_temperature_min", "apparent_temperature_mean", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "precipitation_sum", "rain_sum", "snowfall_sum", "precipitation_hours", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant", "shortwave_radiation_sum", "et0_fao_evapotranspiration"],
	"wind_speed_unit": "ms",
	"timeformat": "unixtime"
};

    try {
        const response = await fetch(url, { params });
		console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve historical weather data:', error);
        throw error;
    }
}
