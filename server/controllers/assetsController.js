// ASSETS

exports.getAllAssetsByTripId = ctx => {
    try{
        ctx.body = assetsModel.getAllAssetsByTripId(ctx.request.params.tripId)
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.getAllAssetsByDayId = ctx => {
    try{
        ctx.body = assetsModel.getAllAssetsByDayId(ctx.request.params.dayId)
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.saveTripAssets = ctx => {
    try{
        ctx.body = assetsModel.saveTripAssets(ctx.request.params.tripId)
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}