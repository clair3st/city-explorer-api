## Overview
Lab assignment for 301
Deployed here `https://city-explorer-api-pe3n.onrender.com`

### Routes
`/weather?lat=<lat>&lon=<lon>`
Using latitue and lonitude values returns the weather forecast for the next 3 days. Utilizes the public api at [api.open-meteo.com]

Example JSON response
```
{
"date": "Oct 21",
"description": "Light Drizzle",
"image": "http://openweathermap.org/img/wn/09d@2x.png",
"max_temp": 15,
"min_temp": 9
}
```

`/movies?city=<city>`
Using a text string for city, search for movies with that city in the title. Utilizes the movies api at themoviedb. Limits to 6 movies

Example JSON response
```
{
"title": "Sleepless in Seattle",
"overview": "After the death of his mother, a young boy calls a radio station in an attempt to set his father up on a date. Talking about his father’s loneliness soon leads to a meeting with a young female journalist, who has flown to Seattle to write a story about the boy and his father.",
"average_votes": 6.7,
"total_votes": 2304,
"image_url": "https://image.tmdb.org/t/p/original//iLWsLVrfkFvOXOG9PbUAYg7AK3E.jpg",
"popularity": 22.813,
"released_on": "1993"
}
```


## Getting Started
Clone github repo
Install packages using npm, node_modules
Run `node server.js` to initiate the api


## Architecture
Node.js backend, using express to create an API


