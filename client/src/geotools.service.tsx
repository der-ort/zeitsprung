import * as geolib from 'geolib';
import { Asset } from './models/types';


// TO DO: recalculate the locationCenter (centroid -> better: centerofbounds) for the day based on the assets!
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