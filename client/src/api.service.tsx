import { Trip } from "./models/types";
import { DateTime, Interval } from "luxon";


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
        
        const createdTrip = await response.json();
        console.log(response);
        return createdTrip;
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