const { uploadDirectory } = require('../multer.config');
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
    const file = ctx.file;
    // check if file exists
        if (!file) {
          ctx.status = 400;
          ctx.body = 'Please upload a file';
          return;
        }

        // call a EXIFR-function (that is to be made) here later on, that returns an object with all this inside
        const description = 'this is hardcoded but the date is dynamic ' + Date.now()
        const type = 'image' // for now only images
        const coordinates = [Math.random() * 140 - 70, Math.random() * 320 - 160]// random for now but ADD exifr function here!
        const captureDate = Date.now() // add exifr functionality -> should return an object with everything...

        // file sieht so aus:
        // {
        //     fieldname: 'file',
        //     originalname: '800px-Lorenz_FrÃ¸lich_MÃ¨re_Bontemps07.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg',
        //     destination: 'C:\\dev\\cw\\solo project\\zeitsprung\\server\\assets\\',
        //     filename: 'file-1713556694013.jpg',
        //     path: 'C:\\dev\\cw\\solo project\\zeitsprung\\server\\assets\\file-1713556694013.jpg',
        //     size: 320927
        //   }


        // construct asset: later create constructor function for this
        const newAsset = {
            description: description, 
            assetType: type, 
            fileLocation: file.filename,
            coordinates: coordinates,
            captureDate: captureDate,
            associatedDays: [ctx.params.dayId],
            associatedTrips: [ctx.params.tripId],
        }

        // add the asset to the database!
        assetsModel.saveTripAssets(newAsset);

        ctx.body = {
          message: 'File uploaded successfully',
          filename: file.filename
        };
      };