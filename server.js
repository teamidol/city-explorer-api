'use strict';





const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const axios = require('axios');
const getWeather = require ('./modules/weather.js');
const getMovies = require('./modules/movies.js')

let data = require('./data/weather.json');



const app = express(); // ***** app === server

app.use(cors());



const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));







app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) =>{

  let userFirstName = request.query.firstName;
  let userLastName = request.query.lasName;

  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
});



app.get('/weather', getWeather);



app.get('/Movies', getMovies);




app.get('*', (request, response) => {
  response.status(404).send('This route does not exist')
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//vvvvvvvvvvvvvvvvvvvvvvv 23mar23 transferred codes

// app.get('/weather', async (request, response, next) => {
  
//   try {

//     let { searchQuery, searchLat, searchLon } = request.query;
//     let dataToGroom = data.find(wtvr => wtvr.city_name === searchQuery);


//     let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=6&lat=${lat}&lon=${lon}`;
//     let weatherResults = await axios.get(url);

//     let dataToSend = dataToGroom.data.map(weatherCond => new Forecast(weatherCond));
  
//     response.status(200).send(dataToSend);
//   } catch (error) {
//     next(error);
//   }
// });


// class Forecast {
//   constructor(data) {
//     this.date = data.valid_date;
//     this.description = data.weather.description;
//   }
// }



// app.get('*', (request, response) => {
//   response.status(404).send('This route does not exist');
// });


// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });


