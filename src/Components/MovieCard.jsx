import React, { useState } from "react";
import genreids from '../Utility/genre'; // Import genreids here


const MovieCard = ({ movieObj, poster_path, name, handleAddtoWatchlist, handleRemoveWatchlist, watchlist }) => {
  const { title, vote_average, genre_ids } = movieObj;
  const genre = genreids[genre_ids[0]]; // Now genreids should be defined

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  function doesContain(movieObj) {
    if (watchlist && watchlist.length) {
      for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].id === movieObj.id) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div
      className="relative h-[70vh] w-[250px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={(event) => {
            event.stopPropagation(); // Stop event propagation
            handleRemoveWatchlist(movieObj);
          }}
          className="absolute top-0 right-0 m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#9940;
        </div>
      ) : (
        <div
          onClick={(event) => {
            event.stopPropagation(); // Stop event propagation
            handleAddtoWatchlist(movieObj);
          }}
          className="absolute top-0 right-0 m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-gray-900/60"
        >
          &#9889;
        </div>
      )}

      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 text-white text-xl p-2 text-center bg-gray-900/60">
          <h3>{title}</h3>
          <p>Rating: {vote_average}</p>
          <p>Genre: {genre}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
