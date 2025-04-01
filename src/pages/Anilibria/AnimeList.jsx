import { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import { API_CONFIG } from '../../config/apiConfig';
import { useDebounce } from '../../hooks/useDebounce';
import { Link } from 'react-router-dom';
import './index.css';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const navigate = useNavigate();

  const getAnimeTitle = (anime) => {
    if (anime.names?.ru) return anime.names.ru;
    if (anime.name?.main) return anime.name.main;
    if (anime.title) return anime.title;
    return "Без названия";
  };

  const handleAnimeClick = (id) => {
    navigate(`/anime/${id}`); // Изменяем маршрут
  };


  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        let url, params = {};

        if (debouncedSearch) {
          url = `${API_CONFIG.BASE_URL}/app/search/releases`;
          params = { query: debouncedSearch, page: currentPage, limit: rowsPerPage };
        } else {
          url = `${API_CONFIG.BASE_URL}/anime/catalog/releases`;
          params = { page: currentPage, limit: rowsPerPage };
        }

        const response = await axios.get(url, {
          params,
          headers: API_CONFIG.HEADERS,
          signal: controller.signal
        });

        setAnimeList(debouncedSearch ? response.data : response.data.data || []);
        setTotalRecords(response.data.meta?.pagination?.total || 0);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Ошибка загрузки:', error);
          setAnimeList([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [debouncedSearch, currentPage, rowsPerPage]);

  const onPageChange = (event) => {
    setCurrentPage(event.page + 1);
    setRowsPerPage(event.rows);
  };

  return (
    <div className="anime-container">
      <div className="search-box">
        <span className="search-icon pi pi-search" />
        <InputText
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск аниме..."
          className="search-input"
        />
      </div>

      {isLoading ? (
        <ProgressSpinner className="loading-spinner" />
      ) : animeList.length > 0 ? (
        <>
          <div className="anime-grid">
            {animeList.map((anime) => (
              <Link key={anime.id} to={`/anime/releases/${anime.id}`} className="anime-card">
                <img
                  src={`https://anilibria.top${anime.poster?.src}`}
                  alt={getAnimeTitle(anime)}
                  className="anime-poster"
                />
                <div className="anime-details">
                  <h3>{getAnimeTitle(anime)}</h3>
                  <p className="description">
                    {anime.description?.slice(0, 150) || 'Описание отсутствует'}...
                  </p>
                  <div className="anime-meta">
                    {anime.year && <span>Год: {anime.year}</span>}
                    {anime.genres?.length > 0 && (
                      <span>Жанры: {anime.genres.map(g => g.name).join(', ')}</span>
                    )}
                    {anime.type && <span>Тип: {anime.type.description}</span>}
                    {anime.age_rating && <span>Рейтинг: {anime.age_rating.label}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Paginator
            first={(currentPage - 1) * rowsPerPage}
            rows={rowsPerPage}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <p className="empty-message">Ничего не найдено</p>
      )}
    </div>
  );
};

export default AnimeList;