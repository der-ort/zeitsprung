const assetsModel = require('../models/assetsModel');

// ASSETS

exports.getAllAssetsByTripId = async ctx => {
    try{
        const tripId = ctx.params.tripId;
        ctx.body = await assetsModel.getAllAssetsByTripId(tripId)
        ctx.status = 200; // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        console.log(err)
        ctx.status = 500;
    }
}

exports.getAllAssetsByDayId = async ctx => {
    try{
        const dayId = ctx.params.dayId;
        console.log("getting assets for day"+ dayId);
        ctx.body = await assetsModel.getAllAssetsByDayId(dayId)
        ctx.status = 200; // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
}

exports.saveTripAssets = async ctx => {
    try{
        const tripId = ctx.params.tripId;
        ctx.body = await assetsModel.saveTripAssets(tripId)
        ctx.status = 200; // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
}