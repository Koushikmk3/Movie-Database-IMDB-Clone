import React, { useEffect, useState } from "react";
import genreids from '../Utility/genre'

function WatchList({ watchlist , setwatchList , handleRemoveWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(['All Genres']);
const [currGenre, setCurrGenre] = useState('All Genres');

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) =>{
    setCurrGenre(genre)
  }
 

  let sortInc = ()=>{
   let sortedInc= watchlist.sort((movieA, movieB)=>{
      return movieA.vote_average - movieB.vote_average
    })

    setwatchList([...sortedInc])
  }



  let sortDec = ()=>{
    let sortedDec= watchlist.sort((movieA, movieB)=>{
      return movieB.vote_average - movieA.vote_average
    })

    setwatchList([...sortedDec])
  }

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp)
    setGenreList(['All Genres' , ...temp]);
  }, [watchlist]);
  




  return (
    <>
      <div className="flex justify-center flex-wrap m-4 gap-4">
        {genreList.map((genre)=>{
           return <div onClick={()=>handleFilter(genre)} className={currGenre==genre ? "flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold" : ' flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4'}>
            {genre}
          </div>
        })}
        
        
      </div>

      <div className="flex justify-center my-4" bg-gray>
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2 ">
            <tr>
              <th>Name</th>

              <th className="flex justify-center">
                <div onClick={sortInc} className="p-2"><i class="fas fa-arrow-down"></i></div>
                <div className="p-2">Ratings</div>
                <div  onClick={sortDec} className="p-2"><i class="fas fa-arrow-up"></i></div>
              </th>

              <th>
                
                <div >Popularity</div>
                
                </th>

              
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
          {watchlist
  .filter((movieObj) => {
    if (currGenre === 'All Genres') { 
      return true;
    } else {
      return genreids[movieObj.genre_ids[0]] === currGenre;
    }
  })
  .filter((movieObj) => {
    return movieObj.title
      .toLowerCase()
      .includes(search.toLocaleLowerCase());
  })
              .map((movieObj) => {
                return (
                  <tr className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[10rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      />

                      <div className="mx-10">{movieObj.title}</div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>

                    <td onClick={()=>handleRemoveWatchlist(movieObj)} className="text-red-800">Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
