'use strict';
const Router = require('koa-router');
const router = new Router();

const tripController = require('./controllers/tripController');
const assetsController = require('./controllers/assetsController');

// TRIPS

    // get all trips of user with userId as an array of Trips
    // request: body contains json object with id -> {id: userId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.get('/user/:userId/trips', tripController.getAllTripsByUserId);

    // get trip with the given tripId
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.get('/trips/:tripId', tripController.getTripById);

    // create new trip for User with ID
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.post('/trips/:userId', tripController.createTrip);

    // delete trip with given id
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.delete('/trips/:tripId', tripController.deleteTrip);

// DAYS
    
    // returns all days for the trip as an array of Day Objects
    // 
    //router.get('/trips/:id/days/', assetsController.getAllDays)

// ASSETS
    // get all assets for the trip with the given ID
    // request: body contains json object with id -> {id: tripId}
    // responds: with a sorted (by date) array of asset objects for the trip with the given ID
    router.get('/trips/:id/assets', assetsController.getAllAssetsByTripId)
    
    // add an array of asset objects to the trip with the given ID
    router.post('/trips/:id/assets', assetsController.saveTripAssets)
    
    
module.exports = router;
