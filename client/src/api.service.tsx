import { Trip } from "./models/types";
import { DateTime, Interval } from "luxon";
import { fetchWeatherApi } from 'openmeteo';


// ADD API SERVICES HERE
const apiURL = 'http://localhost:3000';

// get all Trip Objects for the given User
// is it necessary to return all Trip objects or would it be enough to simply get Ids and descriptions?
// the trip itself can be fetched later with the following function 


// REQUIRES MORE WORK!
// refactor to try/catch instead of promise chain

// export async function getAllTripsByUserId(userId:number):Promise<Trip[]> {

//     // add check for userId
//     const query = apiURL + '/user/trips/' + userId;

//     // return await fetchHandler(query);

//     // fetch all trips for user
//     const tripsArr = fetch(query)

//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network error?');
//             }
//             return response.json();
//         })
//         .then(trips => {
//             console.log(trips);
//             return trips;
//         })
//         .catch(error => {
//             console.error('Problem fetching all trips for user: ', error);
//         });
// }


// REQUIRES MORE WORK!

// get trip with the given ID and return a Trip object if successful
// export async function getTripById(tripId:number):Promise<Trip[]> {
//     // create query
//     const query = apiURL + '/trips/' + tripId;
    
//     try {
//         const trip = fetch(query)
//         console.log(trip);
//         return trip.json();
//     } catch (err) {
//         console.error('Problem fetching all trips for user: ', error);    
//     }

// }


// REQUIRES MORE WORK!

// creates a Trip in the database and returns the new Trip object
export async function createTrip(userId:number, trip:Trip):Promise<Trip> {

    const query = apiURL + '/user/' + userId + '/trips/';

    console.log(query);

    try {
        const response = await fetch(query, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        });

        if (!response.ok) throw new Error('Network error while fetching Days.');
        
        const createdTrip = await response.json();
        console.log(response);
        return createdTrip;
      } catch (error) {
        console.error('Failed to user trips:', error);
      }
}

// creates an empty day for the given trip in the database and returns it 
// creates a Day in the database and returns the new Day object

export async function createDay(trip, date):Promise<Trip> {

    const query = apiURL + '/trips/' + trip.id + '/days/';
    
    const newDay = {
        // id: number, -> should be created automatically by db
        date: date, //timestamp
        tripId: trip.id, //associated Trip ID 
        description: 'Double click to change...',
        blogEntry: 'Double click to create a new blog entry...',
        assets: [],
        locationCenter: trip.locationCenter,
        mood: 0, //default to happy :)
    }

    console.log(newDay);

    try {
        const response = await fetch(query, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDay)
        });

        if (!response.ok) throw new Error('Network error while creating new day.');
        
        const createdDay = await response.json();
        console.log(response);
        return createdDay;
      } catch (error) {
        console.error('Failed to create day:', error);
      }
}

export async function updateDay(day):Promise<Day> {
    const query = apiURL + '/days/' + day.id;

    console.log(day)
    console.log(day.id)


    try {
        const response = await fetch(query, {
            method: "PUT",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(day)
        });

        if (!response.ok) throw new Error('Network error while updating day.');
        
        const updatedDay = await response.json();
        console.log(response);
        return updatedDay;
      } catch (error) {
        console.error('Failed to create day:', error);
      }
}

export async function createDays(trip:Trip):Promise<Trip> {
    
    // calculate the trip length in days in order to create the correct number of Day objects
    const tripStart = DateTime.fromMillis(Number(trip.start));
    const tripEnd = DateTime.fromMillis(Number(trip.end));

    const interval = Interval.fromDateTimes(tripStart, tripEnd);
    const tripLength = interval.length('days'); // get the length in days

    // loop through the days and increment the datetime by 1 day (in millis)
    // then create an empty day with the new date
    
    let currentDate = tripStart; //--> DB needs a timestamp and not a date
    for (let i = 0; i < tripLength; i++) {
        createDay(trip, currentDate);
        currentDate += 86400000; //day in millis, ok for now, maybe there is luxon func for this...
    }
}

 // get historical weather data:
  // parameters for the openmeteo API
  // lat + lon
  // date as a unix timestamp
  export async function getHistoWeather(coordinates, timestamp) {
    
    const lat = coordinates[0];
    const lon = coordinates[1];

    const date = DateTime.fromMillis(Number(timestamp)).toFormat('yyyy-MM-dd');
    const date2 = DateTime.fromMillis(Number(timestamp)+86400000 ).toFormat('yyyy-MM-dd');
    const url = 'https://api.open-meteo.com/v1/archive';

    const params = {
        "latitude": Number(lat),
        "longitude": Number(lon),
        "start_date": date,
        "end_date": date2,
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "temperature_2m_mean", "apparent_temperature_max", "apparent_temperature_min", "apparent_temperature_mean", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "precipitation_sum", "rain_sum", "snowfall_sum", "precipitation_hours", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant", "shortwave_radiation_sum", "et0_fao_evapotranspiration"],
        "wind_speed_unit": "ms"
    };

        try {
            const responses = await fetchWeatherApi(url, { params });
            console.log(responses[0])

            // taken from openmeteo api
            
            // Helper function to form time ranges
            const range = (start: number, stop: number, step: number) =>
           Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
            
            // Process first location. Add a for-loop for multiple locations or weather models
            const response = responses[0];

            // Attributes for timezone and location
            const utcOffsetSeconds = response.utcOffsetSeconds();
            // const timezone = response.timezone();
            // const timezoneAbbreviation = response.timezoneAbbreviation();
            // const latitude = response.latitude();
            // const longitude = response.longitude();

            const daily = response.daily()!;

            console.log(daily);

            // Note: The order of weather variables in the URL query and the indices below need to match!
            const weatherData = {

                daily: {
                    time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                        (t) => new Date((t + utcOffsetSeconds) * 1000)
                    ),
                    weatherCode: daily.variables(0)!.valuesArray()!,
                    temperature2mMax: daily.variables(1)!.valuesArray()!,
                    temperature2mMin: daily.variables(2)!.valuesArray()!,
                    temperature2mMean: daily.variables(3)!.valuesArray()!,
                    apparentTemperatureMax: daily.variables(4)!.valuesArray()!,
                    apparentTemperatureMin: daily.variables(5)!.valuesArray()!,
                    apparentTemperatureMean: daily.variables(6)!.valuesArray()!,
                    sunrise: daily.variables(7)!.valuesArray()!,
                    sunset: daily.variables(8)!.valuesArray()!,
                    daylightDuration: daily.variables(9)!.valuesArray()!,
                    sunshineDuration: daily.variables(10)!.valuesArray()!,
                    precipitationSum: daily.variables(11)!.valuesArray()!,
                    rainSum: daily.variables(12)!.valuesArray()!,
                    snowfallSum: daily.variables(13)!.valuesArray()!,
                    precipitationHours: daily.variables(14)!.valuesArray()!,
                    windSpeed10mMax: daily.variables(15)!.valuesArray()!,
                    windGusts10mMax: daily.variables(16)!.valuesArray()!,
                    windDirection10mDominant: daily.variables(17)!.valuesArray()!,
                    shortwaveRadiationSum: daily.variables(18)!.valuesArray()!,
                    et0FaoEvapotranspiration: daily.variables(19)!.valuesArray()!,
                },

            };

            // `weatherData` now contains a simple structure with arrays for datetime and weather data
            for (let i = 0; i < weatherData.daily.time.length; i++) {
                console.log(
                    weatherData.daily.time[i].toISOString(),
                    weatherData.daily.weatherCode[i],
                    weatherData.daily.temperature2mMax[i],
                    weatherData.daily.temperature2mMin[i],
                    weatherData.daily.temperature2mMean[i],
                    weatherData.daily.apparentTemperatureMax[i],
                    weatherData.daily.apparentTemperatureMin[i],
                    weatherData.daily.apparentTemperatureMean[i],
                    weatherData.daily.sunrise[i],
                    weatherData.daily.sunset[i],
                    weatherData.daily.daylightDuration[i],
                    weatherData.daily.sunshineDuration[i],
                    weatherData.daily.precipitationSum[i],
                    weatherData.daily.rainSum[i],
                    weatherData.daily.snowfallSum[i],
                    weatherData.daily.precipitationHours[i],
                    weatherData.daily.windSpeed10mMax[i],
                    weatherData.daily.windGusts10mMax[i],
                    weatherData.daily.windDirection10mDominant[i],
                    weatherData.daily.shortwaveRadiationSum[i],
                    weatherData.daily.et0FaoEvapotranspiration[i]
                );}

            return responses;
        } catch (error) {
            console.error('Failed to retrieve historical weather data:', error);
            throw error;
        }
    }

// // deletes the Trip from the database and returns the deleted Trip
// export async function deleteTrip(tripId:number):Trip {
//     try {
//         return tripId;
//     } catch (err) {
//         console.log('Error deleting trip: ' + err);
//     }
// }

// export async function getAllDays(tripId:number):Day[] {
//     try {
//         //()
//     } catch (err) {
//         console.log('Error getting all days for trip: ' + err);
//     }
// }

// ADD API functions for historic weather data



// add functions for the moon phase