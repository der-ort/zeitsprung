const { uploadDirectory } = require('../multer.config');
const assetsModel = require('../models/assetsModel');
const { exifGetAll } = require('../exifreader/exif.service');


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
        
        // SHOULD INCLUDE THE currentDay and currentTrip Objects into the request 
        // to include default values and locationCenter etc. here 

        // read EXIF Data
        let exifData = {};
        try {
            exifData = await exifGetAll(file.path);
            console.log('finished reading EXIF data for ' + file.filename)
            console.log(exifData)
        } catch (err) {
            console.error('Error reading EXIF data from ' + file.filename + ' | ' + err)

            exifData = {
                coordinates : [Math.random() * 140 - 70, Math.random() * 320 - 160], // random for now but get the trip default!!!
                captureDate : Date.now() // set to the currentDay date...
            }
        }

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


        // TO DO:
        // Take care of the following attributes:
        const extraData = {
            description : 'no description yet',
            type : 'image',
        }

        // construct asset: later create constructor function for this
        const newAsset = {
            description: extraData.description, 
            assetType: extraData.type, 
            fileLocation: file.filename,
            coordinates: [exifData.latitude, exifData.longitude],
            captureDate: exifData.CreateDate,
            associatedDays: [ctx.params.dayId],
            associatedTrips: [ctx.params.tripId],
            exifData: JSON.stringify(exifData)
        }

        // add the asset to the database!
        assetsModel.saveTripAssets(newAsset);

        ctx.body = {
          message: 'File uploaded successfully',
          filename: file.filename
        };
      };