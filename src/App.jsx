import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Movies from "./Components/Movies";
import WatchList from "./Components/WatchList";
import Banner from "./Components/Banner";


import "./App.css";

function App() {
  let [watchlist, setWatchList] = useState([]);
  let [selectedMovie, setSelectedMovie] = useState(null);

  let handleAddToWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setWatchList(newWatchList);
  };

  let handleRemoveWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });

    setWatchList(filteredWatchlist);
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchlist));
  };

  useEffect(() => {
    let movieFromLocalStorage = localStorage.getItem("moviesApp");
    if (movieFromLocalStorage) {
      setWatchList(JSON.parse(movieFromLocalStorage));
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                watchlist={watchlist}
                handleAddtoWatchlist={handleAddToWatchlist}
                handleRemoveWatchlist={handleRemoveWatchlist}
                onSelectMovie={(movie) => setSelectedMovie(movie)}
              />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              setWatchList={setWatchList}
              handleRemoveWatchlist={handleRemoveWatchlist}
            />
          }
        />
      </Routes>
      {selectedMovie && <MovieDetails movie={selectedMovie} />}
    </BrowserRouter>
  );
}

export default App;
