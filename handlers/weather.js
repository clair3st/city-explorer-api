const weather_codes = require('../data/weather.json');
const axios = require('axios');


const cleanForecast = function(daily){

    return daily.time.map((time, idx) => {

      return new Forecast(
        new Date(time).toDateString().split(' ').slice(1,3).join(' '),
        weather_codes[daily.weather_code[idx]].day.description,
        weather_codes[daily.weather_code[idx]].day.image,
        Math.round(daily.temperature_2m_max[idx]),
        Math.round(daily.temperature_2m_min[idx]))
  })
} 

class Forecast {
  constructor (date, description, img, max, min) {
    this.date = date
    this.description = description
    this.image = img
    this.max_temp = max
    this.min_temp = min
  }
}

module.exports = async function getWeatherData(response, lat, lon) {
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