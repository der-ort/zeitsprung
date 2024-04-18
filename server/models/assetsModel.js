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

module.exports = { getAllAssetsByTripId, getAllAssetsByDayId };