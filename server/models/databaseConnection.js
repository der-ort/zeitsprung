'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const database = 'cw_zeitsprung';
const username = 'postgres';
const password = 'daniel';
const host = 'localhost';
const port = '5432';

const sequelize = new Sequelize(database, username, password, {
   host: host,
   dialect: 'postgres',
});

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

// SYNC all tables -> creates the tables if they do not exist
// do NOT force in productive environment 
sequelize.sync({ force: false, alter: true })
    .then(() => console.log("All models were synchronized successfully."))
    .catch(error => console.error("Error synchronizing models:", error));

module.exports = { sequelize, DataTypes };