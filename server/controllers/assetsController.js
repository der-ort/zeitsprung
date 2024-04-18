// ASSETS

exports.getAllAssetsByTripId = ctx => {
    try{
        ctx.body = assetsModel.getAllAssetsByTripId()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.getAllAssetsByDayId = ctx => {
    try{
        ctx.body = assetsModel.getAllAssetsByDayId()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}

exports.saveTripAssets = ctx => {
    try{
        ctx.body = assetsModel.saveTripAssets()
        ctx.status(200); // SUCCESS 200
    } catch (err) {
        ctx.body = err;
        ctx.status(500);
    }
}