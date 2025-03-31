import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import AnimeList from "./AnimeList";
import './index.css';

export default function AnilibriaPage() {
  const [mainAnimeList, setMainAnimeList] = useState([]);
  const navigate = useNavigate();

  const handleGenreClick = (e, genre) => {
    e.stopPropagation();
    navigate(`/anime?genre=${genre}`);
  };

  const renderField = (field) => {
    if (!field) return null;
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
      return field.description || field.value || null;
    }
    return null;
  };

  useEffect(() => {
    async function getData() {
      const url = "https://anilibria.top/api/v1/anime/catalog/releases?page=1&limit=15";
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const json = await response.json();
        setMainAnimeList(json.data || []);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {/* Блок с поиском и пагинацией */}
      <AnimeList />

      {/* Основной контент */}
      {mainAnimeList.length > 0 ? (
        mainAnimeList.map((element) => (
          <div key={element.id} className="anime-item" style={{ 
            display: "flex", 
            margin: "20px auto",
            maxWidth: "1200px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
          }}>
            <img
              src={`https://anilibria.top${element.poster.src}`}
              alt="Poster"
              style={{ 
                width: "360px", 
                height: '550px',
                objectFit: 'cover'
              }}
            />
            <div style={{ marginLeft: '30px', flex: 1 }}>
              <h2 style={{marginTop: '-10px'}}>{element.name.main} ({element.year})</h2>
              <div className="my-container">
                <strong style={{marginRight: '10px'}}>Жанры:</strong>
                {element.genres?.map(genre => (
                  <Tag
                    key={genre.id}
                    value={renderField(genre.name)}
                    onClick={(e) => handleGenreClick(e, genre.name)}
                    style={{ 
                      cursor: 'pointer', 
                      fontSize: '0.75rem',
                      margin: '2px'
                    }}
                    severity="info"
                    rounded
                  />
                ))}
              </div>              
              <div style={{ 
                display: "flex", 
                gap: '20px', 
                flexWrap: 'wrap',
                margin: '15px 0'
              }}>
                <div style={{ display: "flex", gap: '20px',  justifyContent: "start" }}>
                  <p>
                    <strong>Год:</strong> {element.year || "Unknown"}
                  </p>
                  <p style={{ textWrap: 'wrap' }}>
                    <strong>Сезон:</strong> {element.season?.description || "Unknown"}
                  </p>
                  <p>
                    <strong>Тип:</strong> {element.type?.description || "Unknown"}
                  </p>
                  <p>
                    <strong>Возрастной рейтинг:</strong> {element.age_rating?.label || "Unknown"}
                  </p>
                </div>
              </div>
              <p><strong>Описание:</strong> {element.description || "No description available."}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Загружается аниме...</p>
      )}
    </div>
  );
}