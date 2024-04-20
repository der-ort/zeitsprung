import { fetchWeatherApi } from 'openmeteo';
	
const params = {
	"latitude": 52.52,
	"longitude": 13.41,
	"start_date": "2024-04-04",
	"end_date": "2024-04-18",
	"hourly": "temperature_2m",
	"daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration"],
	"timeformat": "unixtime"
};
const url = "https://archive-api.open-meteo.com/v1/archive";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {

	hourly: {
		time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		temperature2m: hourly.variables(0)!.valuesArray()!,
	},
	daily: {
		time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
			(t) => new Date((t + utcOffsetSeconds) * 1000)
		),
		weatherCode: daily.variables(0)!.valuesArray()!,
		temperature2mMax: daily.variables(1)!.valuesArray()!,
		temperature2mMin: daily.variables(2)!.valuesArray()!,
		sunrise: daily.variables(3)!.valuesArray()!,
		sunset: daily.variables(4)!.valuesArray()!,
		daylightDuration: daily.variables(5)!.valuesArray()!,
		sunshineDuration: daily.variables(6)!.valuesArray()!,
	},

};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
for (let i = 0; i < weatherData.hourly.time.length; i++) {
	console.log(
		weatherData.hourly.time[i].toISOString(),
		weatherData.hourly.temperature2m[i]
	);
}
for (let i = 0; i < weatherData.daily.time.length; i++) {
	console.log(
		weatherData.daily.time[i].toISOString(),
		weatherData.daily.weatherCode[i],
		weatherData.daily.temperature2mMax[i],
		weatherData.daily.temperature2mMin[i],
		weatherData.daily.sunrise[i],
		weatherData.daily.sunset[i],
		weatherData.daily.daylightDuration[i],
		weatherData.daily.sunshineDuration[i]
	);
}
