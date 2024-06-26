// get the sequelize handle from the database connection
const { sequelize, DataTypes } = require('./databaseConnection');
const { Trip, Day, Asset } = require('./databaseModels');

async function getAllTripsByUserId (userId) {
   try {
      const trips = await Trip.findAll({ where: { authorId: userId } });
      let result = [];
      trips.forEach(trip => {
         result.push(trip);
      });
      return result;
   } catch (err) {
      console.log('Error', err);
      return 0;
   }
}

async function getTripById (tripId) {
   try {
      const trip = await Trip.findOne({ where: { id: tripId } });
      return trip;
   } catch (err) {
      console.log('Error', err);
      return 0;
   }
}

async function deleteTrip(tripId) {
   try {
      const trip = await Trip.findOne({ where: { id: tripId } });
      await trip.destroy();
      return trip;
   } catch (err) {
      console.log('Error', err);
      return 0;
   }
}


async function createTrip (trip) {
   try {
      const createdTrip = await  Trip.create(trip);
      return createdTrip;
   } catch (err) {
      console.log('Error:' , err);
      return null;
   }
}

async function createDay (day) {
   try {
      const createdDay = await  Day.create(day);
      return createdDay;
   } catch (err) {
      console.log('Error:' , err);
      return null;
   }
}

async function updateDay (dayId, newDay) {
   try {
      const oldDay = await Day.findOne({ where: { id: dayId } })
      const updatedDay = await oldDay.update(newDay);
      return updatedDay;
   } catch (err) {
      console.log('Error:' , err);
      return null;
   }
}

async function getAllDaysByTripId (tripId) {
   try {
      const days = await Day.findAll({ where: { tripId: tripId } });
      let result = [];
      days.forEach(day => {
         result.push(day);
      });
      result.sort((a, b) => a.date - b.date)
      return result;
   } catch (err) {
      console.log('Error', err);
      return [];
   }
}

module.exports = { getAllTripsByUserId, getTripById, createDay, updateDay, createTrip, deleteTrip, getAllDaysByTripId }