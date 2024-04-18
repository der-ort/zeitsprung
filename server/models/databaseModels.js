const { sequelize, DataTypes } = require('./databaseConnection');

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
 
 // DAY TYPE
 
 const Day = sequelize.define('day', {
     id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
     },
 
     tripId: {
       type: DataTypes.INTEGER,
       allowNull: false
       },
 
     description: {
         type: DataTypes.STRING,
         allowNull: false
     },

     date: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
 
     blogEntry: {
         type: DataTypes.TEXT,
         allowNull: true    
     },
 
     locationCenter: {
         type: DataTypes.ARRAY(DataTypes.FLOAT), // This assumes usage of PostgreSQL. Adjust accordingly for other databases.
         allowNull: true,
     },
     mood: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
             min: 0,
             max: 5
         }
     }
 }, { tableName: 'days' });
 
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
 
     associatedDays: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      allowNull: false,
     },
 
     associatedTrips: { 
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      allowNull: true,
     }
 
  } , { tableName: 'assets' });

  module.exports = { Trip, Day, Asset };