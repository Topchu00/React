import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import AnilibriaService from '../../../entities/anilibria/index.js';
import stl from './index.module.css';
import useText from '../../../shared/hooks/useText.jsx';


const AnilibriaDetails = () => {
    const { getAnimeByIdentifier } = AnilibriaService();
    const { identifier } = useParams();
    const [animeData, setAnimeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {getSlicedText} = useText();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAnimeByIdentifier(identifier);
                if (!data) throw new Error("Данные не получены");
                setAnimeData(data);
            } catch (err) {
                console.error("Ошибка:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [identifier]);

    if (loading) return <div className={stl.loading}>Загрузка...</div>;
    if (error) return <div className={stl.error}>Ошибка: {error}</div>;
    if (!animeData) return <div>Данные не найдены</div>;

    return (
        <div className={stl.container}>
            <div className={stl.top}>
                {/* Постер слева */}
                <div className={stl.poster}>
                    <img
                        src={`https://anilibria.top${animeData?.poster?.src}`}
                        alt={animeData?.name?.main}
                    />
                </div>
    
                {/* Информация справа */}
                <div className={stl.info}>
                    <h1 className={stl.title}>{animeData?.name?.main}</h1>
                    {animeData?.name?.english && (
                        <p className={stl.english}>{animeData?.name?.english}</p>
                    )}
    
                    <div className={stl.tags}>
                        <span className={stl.age}>{animeData?.age_rating?.label || '—'}</span>
                        {animeData?.publish_day?.description && (
                            <span className={stl.day}>{animeData.publish_day.description}</span>
                        )}
                    </div>
    
                    <div className={stl.details}>
                        <p><strong>Тип:</strong> {animeData?.type?.description || '—'}</p>
                        <p><strong>Сезон:</strong> {animeData?.season?.description || '—'}</p>
                        <p><strong>Жанры:</strong> {animeData?.genres?.map((g, i) => (
                            <span key={i}>{i > 0 ? ` • ${g.name}` : g.name}</span>
                        ))}</p>
                        <p><strong>Год выхода:</strong> {animeData?.year || '—'}</p>
                        <p><strong>Длительность:</strong> 
                            {animeData?.average_duration_of_episode 
                                ? ` ~ ${animeData.average_duration_of_episode} мин`
                                : '—'}
                        </p>
                        <p><strong>Всего эпизодов:</strong> {animeData?.episodes_total || '—'} эпизодов</p>
                    </div>
                </div>
            </div>
    
            {/* Описание снизу */}
            {animeData?.description && (
                <div className={stl.description}>
                    <p>{getSlicedText(animeData.description, 0, 1000)}</p>
                </div>
            )}
        </div>
    );
};

export default AnilibriaDetails;