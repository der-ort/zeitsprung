'use strict' ;
const models = require('../models/tripModel');

// TO DO:
//    - Adjust error messages

// TRIPS

exports.getAllTripsByUserId = async ctx=> {
    try{
        ctx.body = await tripModel.getAllTripsByUserId()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.getTripById = async ctx=> {
    try{
        ctx.body = await tripModel.getTripById()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.createTrip = async ctx=> {
    try{
        const trip = ctx.request.body;
        ctx.body = await tripModel.createTrip(trip)
        ctx.status(201); // CREATED 201
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.deleteTrip = async ctx=> {
    try{
        ctx.body = await tripModel.deleteTrip()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.getAllDays = async ctx=> {
    try{
        ctx.body = await tripModel.getAllDays()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}
