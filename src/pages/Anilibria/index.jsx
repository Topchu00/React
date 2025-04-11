import {useEffect, useState} from "react";
import AnilibriaService from "../../entities/anilibria/index.js";
import {AnilibiriaCard, AnilibiriaSearchInput} from "../../widgets/Anilibria/index.js";
import PageHeader from "../../widgets/PageHeader/index.js";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDebounce } from "../../shared/hooks/useDebounce.jsx";

import stl from './index.module.css'

export const Anilibria = () => {
    const { getAnimeCatalog, searchAnime } = AnilibriaService();
    const [catalog, setCatalog] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                let response;
                
                if (debouncedSearchTerm) {
                    // Используем отдельный метод для поиска, если есть поисковый запрос
                    response = await searchAnime(debouncedSearchTerm);
                    setCatalog(response);
                } else {
                    // Иначе загружаем полный каталог
                    response = await getAnimeCatalog();
                    setCatalog(response);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError("Ошибка загрузки данных");
                    console.error(err);
                }
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
        
        return () => controller.abort();
    }, [debouncedSearchTerm]);

    return (
        <>
            <PageHeader title='Каталог релизов'>
                <AnilibiriaSearchInput value={searchTerm} onChange={setSearchTerm} />
            </PageHeader>
            <div className={stl.wrapper}>
                {isLoading ? (
                    <div className={stl.loading}>
                        <ProgressSpinner />
                    </div>
                ) : error ? (
                    <div className={stl.error}>{error}</div>
                ) : catalog.length === 0 ? (
                    <div className={stl.noResults}>
                        {searchTerm ? 'Ничего не найдено' : 'Каталог пуст'}
                    </div>
                ) : (
                    catalog.map(item => (
                        <AnilibiriaCard 
                            key={item.id} 
                            item={item} 
                            searchTerm={searchTerm}
                        />
                    ))
                )}
            </div>
        </>
    )
}