import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import instance from '../axios';
import '../Styles/Row.css';

const baseURL = 'https://image.tmdb.org/t/p/w500/';

function Row({ title, fetchUrl, isLargeRow }) {

  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
    }

    fetchData();
  }, [fetchUrl])

  const handleClickMovie = (movie) => {
    console.log(movie)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.original_title || movie?.title || movie?.name || "").then(url => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v'));
      }).catch(error => console.log(error))
    }
  };

  const opts = {
    height: "450",
    width: "100%",
    plauerVars: {
      autoplay: 1,
    }
  }

  return (
    <div className="row">

      {isLargeRow ? <h2 className='row__header'>{title}</h2> : <h3 className='row__header'>{title}</h3>}

      <div className={`row__posters ${ isLargeRow && "row__postersLarge"}`}>
        
        {movies.map(movie => (
          <img 
              key={movie.id}
              className={`row__poster ${ isLargeRow && "row__posterLarge"}`}
              src={`${baseURL}${ isLargeRow ?  movie.poster_path : movie.backdrop_path}`} 
              alt={movie.original_title} 
              onClick={() => handleClickMovie(movie)}
          />
        ))}

      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;