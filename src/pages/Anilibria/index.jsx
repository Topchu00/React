import { useEffect, useState } from "react";
import axios from "axios";
import { fetchAnimeList } from '../../entities/anime';

export default function Anilibria() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetchAnimeList().then(setAnimeList);
    // const fetchData = async () => {
    //     try {
    //       const response = await axios.get(
    //         "https://anilibria.top/api/v1/anime/catalog/releases?page=1&limit=30"
    //       );
    //       setAnimeList(response.data.data || []);
    //     } catch (error) {
    //       console.error(error.message);
    //     }
    //   };
    
    //   fetchData();
  }, []);

  return (
    <div>
      <h1>Anilibria Page</h1>
      {animeList.length ? (
        animeList.map(({ id, name, year, poster, type, season, description, genres, episodes_total, age_rating }) => (
          <div key={id} className="anime-item">
            <h2>{name.main} ({year})</h2>
            <img src={`https://anilibria.top${poster.src}`} alt={name.main} style={{ maxWidth: "400px" }} />
            <p><strong>year:</strong> {year}</p>
            <p><strong>Type:</strong> {type?.description || "Unknown"}</p>
            <p><strong>Season:</strong> {season?.description || "Unknown"}</p>
            <p><strong>Description:</strong> {description || "No description available."}</p>
            <p><strong>Genres:</strong> {genres.map(g => g.name).join(", ")}</p>
            <p><strong>Episodes:</strong> {episodes_total}</p>
            <p><strong>Age Rating:</strong> {age_rating?.label || "Unknown"}</p>
          </div>
        ))
      ) : (
        <p>Loading anime list...</p>
      )}
    </div>
  );
}
