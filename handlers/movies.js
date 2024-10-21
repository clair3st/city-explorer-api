const axios = require('axios');

module.exports = async function getMovieData(response, city) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${process.env.MOVIES_KEY}`
  try {
  	const raw_movies = await axios.get(url)
  	if(raw_movies.data.results){

	    response.send(cleanMovies(raw_movies.data.results))
  	} else {
  		 response.status(404).send('Could not locate movie data')
  	}
  } catch (error){
  	console.log(error)
    response.status(404).send('Could not get movie data', error)
  }
}

function cleanMovies(data){
	return data.filter(m => m.vote_count>3).map(movie => new Movie(movie))
}

class Movie{
	constructor(data) {
		this.title= data.title
	    this.overview= data.overview 
	    this.average_votes= data.vote_average
	    this.total_votes= data.vote_count
	    this.image_url= data.poster_path
	    this.popularity= data.popularity
	    this.released_on= data.release_date.split('-')[0]
	}
}