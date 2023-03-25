'use strict'

const axios =require('axios');
const { application } = require('express');

let cache = {
  seattle = {
    data: application,
    timestamp: Date.now(),


  }
};

async function getMovies(request,response, next) {
  try {
  
    let keywordFromFrontEnd = request.query.searchQuery;

    let key = `${keywordFromFrontEnd}-Photo`; //key = seattle-Photo

    if(cache[key] && (Date.now()- cache[key].timestamp) < 2629800000) {
      console.log('Cache was hit', cache);

      response.status(200).send(cache[key].data);

  
    } else {

      console.log('No items in cache');

      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${cityFromFrontEnd}`;

      cache[key] = {
        data: photoToSend;
        timestamp: Date.now()
      };




      response.status(200).send(moviesToSend);
    }

    let cityFromFrontEnd = request.query.city_name;
    // TODO: BUILD MY URL FOR AXIOS
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${cityFromFrontEnd}`;
    let movieResults = await axios.get(url);

    // TODO: GROOM THAT DATA TO SEND TO FRONTEND
    let moviesToSend = movieResults.data.results.map(movie => {
      return new Movies(movie);
    });

    response.status(200).send(moviesToSend);

  


  } catch (error) {
    next(error);
  }
}

class Movies {
  constructor(movieObj){
    this.title=movieObj.original_title;
    this.overview=movieObj.overview;
    this.image = `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
  }
}


module.exports = getMovies;
