'use strict';

require('dotenv').config(); // this library lets us access our .env file

const express = require('express'); // express is a server library
const cors = require('cors'); // library that determines who is allowed to speak to our server
const app = express(); // initalizes the express library
const PORT = process.env.PORT;// we are getting the port variable from the .env file.
const weather = require('./data/weather.json')

class Forecast {
  constructor (date, description) {
    this.date = date
    this.description = description
  }
}

const cleanForecast = function(city){
  return city.data.map(x => new Forecast(x.valid_date, x.weather.description))
}

app.use(cors()); // this settting says that everyone is allowed to speak to our server

// this is a route.
app.get('/', (request, response) => {
  response.send('hello from the home route');
});

app.get('/weather', (request, response)=>{
  console.log('Here are our query params', request.query);

  var match = ''
  if('lon' in request.query && 'lat' in request.query){ //?lat=47.6038321&lon=-122.330062
    match = weather.find(x=> x.lat == request.query.lat && x.lon == request.query.lon)  
  } else if ('city' in request.query){
    match = weather.find(x=>x.city_name.toLowerCase() == request.query.city.toLowerCase())
  }

  if (match) {
    response.send(cleanForecast(match))
  } else {
    response.status(404).send('Could not locate weather data')
  }

})

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));

