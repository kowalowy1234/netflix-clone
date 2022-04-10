import React, { useEffect, useState } from 'react'
import instance from '../axios';
import requests from '../requests';
import '../Styles/Banner.css'

const baseURL = 'https://image.tmdb.org/t/p/original/';

function Banner({ fetchUrl }) {

  const [movie, setMovie] = useState([])

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
      );
    }
    fetchData();
  }, [])

  function truncate(str, n){
    str = str ? str : ""
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };

  return (
    <header className="banner"
      style = {{
        backgroundImage: `url(
          "${baseURL}${movie?.backdrop_path}"
          )`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        opacity: "90%",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.original_title || movie?.title || movie?.name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        
        <h1 className="banner_overview">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      
      <div className="banner--fadeBottom"></div>

    </header>
  )
}


export default Banner