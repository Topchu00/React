import React from 'react';
import stl from './index.module.css';
import { NavLink } from "react-router-dom";
import useText from "../../../../shared/hooks/useText.jsx";

const Card = ({ item, searchTerm = '' }) => {
    const { getSlicedText, highlightSearchTerm } = useText();

    // Универсальная функция для получения жанров
    const getGenres = () => {
        // Если жанры приходят как массив объектов { name: string }
        if (item.genres?.[0]?.name) {
            return item.genres.map(g => g.name);
        }
        // Если жанры приходят как массив строк
        if (Array.isArray(item.genres)) {
            return item.genres;
        }
        // Если жанры приходят как строка с разделителями
        if (typeof item.genres === 'string') {
            return item.genres.split(', ');
        }
        return [];
    };

    return (
        <NavLink to={`/anilibria/${item?.alias}`} className={stl.card}>
            <div className={stl.preview}>
                <img
                    src={`https://anilibria.top/${item?.poster?.src}`}
                    alt={item?.name?.main}
                />
            </div>
            <div className={stl.content}>
                <div className={stl.content__title}>
                    <h3>{item?.name?.main}</h3>
                    <p>{item?.name?.english}</p>
                </div>
                
                {/* Блок с жанрами */}
                <div className={stl.content__geners}>
                    {getGenres().map((genre, idx) => (
                        <span key={idx}>
                            {idx > 0 && ' • '}
                            {genre}
                        </span>
                    ))}
                </div>

                <div className={stl.content__description}>
                    <p>{getSlicedText(item?.description, 0, 500)}</p>
                </div>
            </div>
        </NavLink>
    );
};

export default Card;