'use strict';

require('dotenv').config(); // this library lets us access our .env file
const express = require('express'); // express is a server library
const cors = require('cors'); // library that determines who is allowed to speak to our server
const getWeatherData = require('./handlers/weather.js')
const getMovieData = require('./handlers/movies.js')
const app = express(); // initalizes the express library
const PORT = process.env.PORT;// we are getting the port variable from the .env file.


app.use(cors()); // this settting says that everyone is allowed to speak to our server

// this is a route.
app.get('/', (request, response) => {
  response.send('hello from the home route');
});

app.get('/weather', (request, response)=>{
  console.log('Here are our weather query params', request.query);

  if('lon' in request.query && 'lat' in request.query){ //?lat=47.6038321&lon=-122.330062
    getWeatherData(response, request.query.lat, request.query.lon)
    
  } else {
    response.status(400).send('Bad request')
  }

})

app.get('/movies', (request, response) => {
    console.log('Here are our movies query params', request.query);

    if('city' in request.query){
      getMovieData(response, request.query.city.toLowerCase())
    } else {
      response.status(400).send('Bad request')
    }
})

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));

