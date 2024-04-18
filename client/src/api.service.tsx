import { Day, Trip } from "./models/types";

// ADD API SERVICES HERE
const apiURL = 'http://localhost:3000';

// get all Trip Objects for the given User
// is it necessary to return all Trip objects or would it be enough to simply get Ids and descriptions?
// the trip itself can be fetched later with the following function 


async function fetchHandler(query, options) {
    const response = await fetch(query, options);
    if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
    }
    return await response.json();
}

// REQUIRES MORE WORK!

export async function getAllTripsByUserId(userId:number):Promise<Trip[]> {

    // add check for userId
    const query = apiURL + '/user/trips/' + userId;

    // return await fetchHandler(query);

    // fetch all trips for user
    const tripsArr = fetch(query)

        .then(response => {
            if (!response.ok) {
                throw new Error('Network error?');
            }
            return response.json();
        })
        .then(trips => {
            console.log(trips);
            return trips;
        })
        .catch(error => {
            console.error('Problem fetching all trips for user: ', error);
        });
}


// REQUIRES MORE WORK!

// get trip with the given ID and return a Trip object if successful
export async function getTripById(tripId:number):Promise<Trip[]> {
    // create query
    const query = apiURL + '/trips/' + tripId;
    
    // fetch trip
    const trip = fetch(query)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network error?');
            }
            return response.json();
        })
        .then(trip => {
            console.log(trip);
            return trip;
        })
        .catch(error => {
            console.error('Problem fetching all trips for user: ', error);
        });
}


// REQUIRES MORE WORK!

// creates a Trip in the database and returns the Trip object
export async function createTrip(userId:number, trip:Trip):Promise<Trip> {

    const query = apiURL + '/trips/' + userId;

    try {
        const event = await fetch(query, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip) // stringify the Trip object and include in the body
        });
            console.log('creating trip "' + trip.name + '" successful')
            return await event.json();
    } catch (err) {
        console.log('Error creating event: ' + err);
    }
}

// deletes the Trip from the database and returns the deleted Trip
export async function deleteTrip(tripId:number):Trip {
    try {
        return tripId;
    } catch (err) {
        console.log('Error deleting trip: ' + err);
    }
}

export async function getAllDays(tripId:number):Day[] {
    try {
        //()
    } catch (err) {
        console.log('Error getting all days for trip: ' + err);
    }
}