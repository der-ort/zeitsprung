const { sequelize, Op, DataTypes } = require('./databaseConnection');
const { Trip, Day, Asset } = require('./databaseModels');

 async function getAllAssetsByTripId (tripId) {
   try {
      // return all Assets where the trip is associated
      const assets = await Asset.findAll({where: {
            associatedTrips: {
                [Op.contains]: [tripId] //Op = Operator, contains can look inside arrays
            }
         }
      });

      return assets;
   
   } catch (err) {
      console.log('Error', err);
      return [];
   }
}

// Takes all assets from the formData and stores them
// inside the database
// should also read EXIF data to get: captureDate, lat, lon, etc.
async function saveTripAssets(asset) {
   try {
      const newAsset = await Asset.create(asset);
      console.log("Asset stored successfully:", newAsset);
      return newAsset;
   } catch (err) {
      console.error("Failed to create asset:", err);
   }
}

async function getAllAssetsByDayId (dayId) {
   try {
      // return all Assets where the trip is associated
      const assets = await Asset.findAll({where: {
            associatedDays: {
                [Op.contains]: [dayId] //Op = Operator, contains can look inside arrays
            }
         }
      });

      return assets;
   
   } catch (err) {
      console.log('Error', err);
      return [];
   }
}

module.exports = { saveTripAssets, getAllAssetsByTripId, getAllAssetsByDayId };