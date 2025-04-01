import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { API_CONFIG } from '../../config/apiConfig';
import './animedetail.css';

const AnimeDetail = () => {
  const { id } = useParams(); // Получаем ID из URL
  const [anime, setAnime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    console.log("Anime ID from URL:", id);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/anime/releases/${id}`, {
          headers: API_CONFIG.HEADERS,
        });
        setAnime(response.data);
      } catch (error) {
        console.error('Ошибка загрузки аниме:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className="anime-detail-container">
        <div className='anime-detail-poster'>
            <h2>{anime?.name?.main}</h2>
            <img src={`https://anilibria.top${anime?.poster?.src}`} alt={anime?.name?.main} />
        </div>
        <div className="anime-info">
            {anime.year && <span>Год: {anime.year}</span>}
            {anime.genres?.length > 0 && (
                <span>Жанр: {anime.genres.map(g => g.name).join(' ')}</span>
            )}
            {anime.type && <span>Тип: {anime.type.description}</span>}
            {anime.age_rating && <span>Рейтинг: {anime.age_rating.label}</span>}
        </div>
        <p>{anime?.description}</p>
    </div>
  );
};

export default AnimeDetail;