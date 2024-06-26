'use strict' ;
const tripModel = require('../models/tripModel');


// TO DO:
//    - Adjust error messages

// TRIPS

exports.getAllTripsByUserId = async ctx=> {
    try{
        const userId = ctx.params.userId;
        ctx.body = await tripModel.getAllTripsByUserId(userId);
        ctx.status = 200; // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
}

exports.getTripById = async ctx=> {
    try{
        const tripId = ctx.params.tripId;
        ctx.body = await tripModel.getTripById(tripId);
        ctx.status =200; // SUCCESS 200
    } catch (err) {
        console.log(err);
        ctx.body = err;
        ctx.status = 500;
    }
}

exports.createTrip = async ctx=> {
    try{
        const trip = ctx.request.body;
        ctx.body = await tripModel.createTrip(trip);
        ctx.status = 201; // CREATED 201
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
}

exports.deleteTrip = async ctx=> {
    try{
        const tripId = ctx.params.tripId;
        ctx.body = await tripModel.deleteTrip(tripId);
        ctx.status = 200; // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
}

exports.getAllDaysByTripId = async ctx => {
    try{
        const tripId = ctx.params.tripId;
        ctx.body = await tripModel.getAllDaysByTripId(tripId);
        ctx.status =200; // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status =500;
    }
}

exports.createDay = async ctx=> {
    try{
        const day = ctx.request.body;
        ctx.body = await tripModel.createDay(day);
        ctx.status = 201; // CREATED 201
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
}

exports.updateDay = async ctx=> {
    try{
        const dayId = ctx.params.dayId
        const newDay = ctx.request.body;
        ctx.body = await tripModel.updateDay(dayId, newDay);
        ctx.status = 200;
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
}
