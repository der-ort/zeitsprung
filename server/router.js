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

    // create new trip for User with given id
    // request: body contains json object with id -> {id: tripId} -> should be overwritten by server
    // responds: with the newly created trip object (that has the updated ID)!
    router.post('/user/:userId/trips', tripController.createTrip);

    // delete trip with given id
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.delete('/trips/:tripId', tripController.deleteTrip);

// DAYS
    
    // returns all days for the trip as an array of Day Objects
    // 
    router.get('/trips/:tripId/days', tripController.getAllDaysByTripId)

    // creates a day for the given trip
    router.post('/trips/:tripId/days', tripController.createDay)

// ASSETS
    // get all assets for the trip with the given ID
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.get('/assets/trips/:tripId', assetsController.getAllAssetsByTripId)

    // get all assets for the day with the given ID
    // responds: with a sorted (by date) array of asset objects for the day with the given ID
    router.get('/assets/day/:dayId', assetsController.getAllAssetsByDayId)
    
    // upload a single file using multer
    // can later be adjusted to take an array of objects but for now the single file upload is working fine
    // multiple file upload is being handled by the client with a map-loop
    router.post('/assets/trip/:tripId/day/:dayId', upload.single('file'), assetsController.saveTripAssets)
    
    
module.exports = router;
