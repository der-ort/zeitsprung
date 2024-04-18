// get the sequelize handle from the database connection

import { sequelize } from "./databaseConnection";

// TRIP TYPE
const Trip = sequelize.define('trip', {

   authorId: {
      type: DataTypes.BIGINT,
      allowNull: false
   },

   name: {
    type: DataTypes.STRING,
    allowNull: false
   },

   description: {
      type: DataTypes.STRING,
      allowNull: false
   },

   locationCenter: { // central point of the trip
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: true,
   },

   start: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
   },

   end: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
   },

   assets: { // ARRAY of associated assets (images)
    type: DataTypes.ARRAY(DataTypes.BIGINT),
    allowNull: true,
   }
} , { tableName: 'trips' });


// ASSET TYPE

const Asset = sequelize.define('asset', {

    description: {
       type: DataTypes.STRING,
       allowNull: false
    },

    assetType: {
       type: DataTypes.STRING,
       allowNull: false
    },

    fileLocation: {
        type: DataTypes.STRING,
        allowNull: false
     },

    coordinates: {
         type: DataTypes.ARRAY(DataTypes.FLOAT),
         allowNull: true,
    },

    captureDate: {
       type: DataTypes.BIGINT,
       allowNull: false,
       defaultValue: 0
    },

    associatedDate: {
     type: DataTypes.BIGINT,
     allowNull: false,
     defaultValue: 0
    },

    associatedTrips: { // ARRAY of associated assets (images)
     type: DataTypes.ARRAY(DataTypes.BIGINT),
     allowNull: true,
    }

 } , { tableName: 'assets' });


async function getAllTripsByUserId (userId) {
   try {
      const trips = await Trip.findAll(); //add to filter by userId
      let result = [];
            
      trips.forEach(trip => {
         result.push({
            message: 'HEY THIS IS MY RESULT!'
         });
      });
      return result;
   } catch (err) {
      console.log('Error', err);
      return 0;
   }
}

async function createTrip (trip) {
   try {
      await   Trip.create(trip);
   } catch (err) {
      console.log('Error:' , err);
      return null;
   }
}

module.exports = { getAll, createTrip };