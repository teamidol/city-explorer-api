'use strict';


console.log('Yes our first server!');

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('.data/data.json');


const app = express(); // ***** app === server

app.use(cors());


const PORT = process.env.PORT || 3002;





app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));


// 2ND arg - callback that will execute when that enpoint is hit

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});




app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;

  response.status(200).send(`Hello ${userFirstName} ${userLastName}! Welcome to my server!`);
});


app.get('/pet', (request, response) => {
  try {
    queriedSpecies = request.query.species;

    let dataToGroom = data.find(pet => pet.species === queriedSpecies);
    let dataToSend = new Pet(dataToGroom);)

response.status(200).send(dataToSend);
  
  } catch (error) {
  next(error);
}
});

// CLASS TO GROOM THE BULKY DATA

class Pet {
  constructor(petObj) {
    this.name = petObj.name;
    this.breed = petObj.breed;
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