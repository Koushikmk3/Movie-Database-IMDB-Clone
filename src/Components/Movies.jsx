import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagination from './Pagination';

function Movies({handleAddtoWatchlist, handleRemoveWatchlist , watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=ec7f7f5aaf24c26ce83e773d73e0a211&language=en-US&page=${pageNo}`)
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  }, [pageNo]);

  return (
    <div>
      <div className='text-2xl m-5 font-bold text-center '>Trending Movies</div>

      <div className='flex flex-row flex-wrap justify-around gap-8'>
        {movies.map((movieObj) => {
          return <MovieCard movieObj={movieObj} key={movieObj.id} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveWatchlist={handleRemoveWatchlist} watchlist={watchlist} />;
        })}
      </div>

      <Pagination pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
}

export default Movies;
