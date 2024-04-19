'use strict';
const Router = require('koa-router');
const router = new Router();

const tripController = require('./controllers/tripController');
const assetsController = require('./controllers/assetsController');
const { upload } = require('./multer.config');

// TRIPS

    // get all trips of user with userId as an array of Trips
    // request: body contains json object with id -> {id: userId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.get('/user/:userId/trips', tripController.getAllTripsByUserId);

    // get trip with the given tripId
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.get('/trips/:tripId', tripController.getTripById);

    // create new trip for User with given id in the passed JSON Object -> property: authorId
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.post('/trips', tripController.createTrip);

    // delete trip with given id
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.delete('/trips/:tripId', tripController.deleteTrip);

// DAYS
    
    // returns all days for the trip as an array of Day Objects
    // 
    router.get('/trips/:tripId/days', tripController.getAllDaysByTripId)

// ASSETS
    // get all assets for the trip with the given ID
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.get('/assets/trips/:tripId', assetsController.getAllAssetsByTripId)

    // get all assets for the day with the given ID
    // responds: with a sorted (by date) array of asset objects for the day with the given ID
    router.get('/assets/day/:dayId', assetsController.getAllAssetsByDayId)
    
    // add an array of asset objects to the trip with the given ID
    //multer file fields:
    const fileFields = [
        { name: 'file', maxCount: 99 } // Adjust according to your needs
    ];
    
    router.post('/assets/trip/:tripId/day/:dayId', upload.single('file'), assetsController.saveTripAssets)
    
    
module.exports = router;
