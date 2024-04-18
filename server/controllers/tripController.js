'use strict' ;
const models = require('../models/tripModel');

// TO DO:
//    - Adjust error messages

// TRIPS

exports.getAllTripsByUserId = ctx => {
    try{
        ctx.body = tripModel.getAllTripsByUserId()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.getTripById = ctx => {
    try{
        ctx.body = tripModel.getTripById()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    
}

exports.createTrip = ctx => {
    try{
        ctx.body = tripModel.createTrip()
        ctx.status(201); // CREATED 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.deleteTrip = ctx => {
    try{
        ctx.body = tripModel.deleteTrip()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.getAllDays = ctx => {
    try{
        ctx.body = tripModel.getAllDays()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}
