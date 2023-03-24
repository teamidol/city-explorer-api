'use strict';


console.log('Yes our first server!');

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/weather.json');


const app = express(); // ***** app === server

app.use(cors());


const PORT = process.env.PORT || 3002;





app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));


// 2ND arg - callback that will execute when that enpoint is hit

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

//vvvvvvvvvvvvvvvvvvvv       trello 2/3
//here
app.get('/weather', (request, response, next) => {
  // let searchQuery = request.query.searchQuery;
  // let searchLat = request.query.searchLat;
  // let searchLon = request.query.searchLon;
  try {
// request.query is url (mr. hamerly), compare console.log line 41 and 44
console.log(request.query);
    let { searchQuery, searchLat, searchLon } = request.query;
    let dataToGroom = data.find(wtvr => wtvr.city_name === searchQuery);
    console.log(dataToGroom);
    let dataToSend = dataToGroom.data.map(weatherCond => new Forecast(weatherCond));
  
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
});

//vvvvvvvvvvvvvvvv    trello 2/5
class Forecast {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}


//        CATCH ALL
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// **** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ****
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//vvvvvvvvvvvvvvvvv teacher's code
// });

// app.get('/hello', (request, response) => {
//   console.log(request.query);
//   let userFirstName = request.query.firstName;
//   let userLastName = request.query.lastName;

//   response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
// });
//vvvvvvvvvvvvvvvvvv          trello 2/4
// app.get('/weather', (request, response, next) => {
//   try {
//     let queriedCity = request.query.city;


//   } catch (error) {
//     next(error);
//   }
// });

// CLASS TO GROOM THE BULKY DATA
