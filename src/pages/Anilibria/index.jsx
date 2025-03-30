import { ListItem } from "../../components/Anime/List";
import { useEffect, useState } from "react";

export default function AnilibriaPage() {
  const [animeList, setAnimeList] = useState([]); // Initialize state to store anime data

  useEffect(() => {
    async function getData() {
      const url =
        "https://anilibria.top/api/v1/anime/catalog/releases?page=1&limit=3";
      try {
        const response = await fetch(url, {});
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setAnimeList(json.data || []); // Set anime data into state
      } catch (error) {
        console.error(error.message);
      }
    }

    getData(); // Call the async function to fetch the data
  }, []); // Empty dependency array means this runs once when the component is mounted

  return (
    <div>
      <h1>Anilibria Page</h1>
      {animeList.length > 0 ? (
        animeList.map((element) => (
          <div key={element.id} className="anime-item">
            <h2>
              {element.name.main} ({element.year})
            </h2>
            <img
              src={`https://anilibria.top${element.poster.src}`}
              alt="Poster"
              style={{ maxWidth: "200px" }} // Adjust image size as needed
            />
            <p>
              <strong>Type:</strong> {element.type?.description || "Unknown"}
            </p>
            <p>
              <strong>Season:</strong>{" "}
              {element.season?.description || "Unknown"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {element.description || "No description available."}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {element.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              <strong>Episodes:</strong> {element.episodes_total}
            </p>
            <p>
              <strong>Age Rating:</strong>{" "}
              {element.age_rating?.label || "Unknown"}
            </p>
          </div>
        ))
      ) : (
        <p>Loading anime list...</p> // Show loading message if anime list is empty
      )}
    </div>
  );
}
