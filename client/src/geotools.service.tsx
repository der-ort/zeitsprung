import * as geolib from 'geolib';
import { Asset } from './models/types';


// recalculate the locationCenter (centroid -> better: centerofbounds) for the day based on the assets!
// TO DO: refactor so that it takes Day[], Trip[] and Asset[]
// eslint-disable-next-line no-inner-declarations
export function getCenterOfBounds(assets:Asset[]) {
    
    if (!assets || assets.length <= 1) return [0,0];
    
    const coordinatesArray = [];
    
    assets.map((asset) => {
        coordinatesArray.push(asset.coordinates);
    });
    
    const centerOfBounds = geolib.getCenterOfBounds(coordinatesArray); 
    return centerOfBounds;
}


// reverse geocoder using the nominatim API
// IN DEVELOPMENT, not working right now :(
// should be fairly easy though...
export function reverseGeocode(coords) {
    const lat = coords[0]
    const lon = coords[1]

    const apiURL = 'https://nominatim.openstreetmap.org/reverse';

    // zoom 8 = county level https://nominatim.org/release-docs/develop/api/Reverse/
    const query =  apiURL + `?lat=${lat}&lon=${lon}&format=json&zoom=${8}`

    fetch(query, {
        method: 'GET',
        headers: {
            'User-Agent': 'YourApp/1.0 (contact@example.com)'
        }
    })

    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.address) {
            document.getElementById('address').textContent = 
                data.address.road + ', ' +
                data.address.city + ', ' +
                data.address.country;
        } else {
            document.getElementById('address').textContent = 'No address found.';
        }
    })
    
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('address').textContent = 'Failed to retrieve address.';
    });
}