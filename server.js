'use strict';

require('dotenv').config(); // this library lets us access our .env file
const express = require('express'); // express is a server library
const cors = require('cors'); // library that determines who is allowed to speak to our server
const weather_codes = require('./data/weather.json');
const axios = require('axios');
const app = express(); // initalizes the express library
const PORT = process.env.PORT;// we are getting the port variable from the .env file.

class Forecast {
  constructor (date, description, img, max, min) {
    this.date = date
    this.description = description
    this.image = img
    this.max_temp = max
    this.min_temp = min
  }
}

const cleanForecast = function(daily){

  return daily.time.map((time, idx) => {
    return new Forecast(
      time,
      weather_codes[daily.weather_code[idx]].day.description,
      weather_codes[daily.weather_code[idx]].day.image,
      daily.temperature_2m_max[idx],
      daily.temperature_2m_min[idx])
  })
}

async function getWeatherData(response, lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=3`;

  try {
    const weather_response = await axios.get(url)
    if(weather_response.data.daily){
       response.send(cleanForecast(weather_response.data.daily))
    } else {
      response.status(404).send('Could not locate weather data')
    }
  } catch (error) {
    response.status(404).send('Could not locate weather data')
  }
}

app.use(cors()); // this settting says that everyone is allowed to speak to our server

// this is a route.
app.get('/', (request, response) => {
  response.send('hello from the home route');
});

app.get('/weather', (request, response)=>{
  console.log('Here are our query params', request.query);
  let weatherData = ''

  if('lon' in request.query && 'lat' in request.query){ //?lat=47.6038321&lon=-122.330062
    weatherData = getWeatherData(response, request.query.lat, request.query.lon)
    
  } else {
    response.status(400).send('Bad request')
  }

})

// this turns the server on to the port that you specifed in your .env file
app.listen(PORT, () => console.log(`listening on ${PORT}`));

