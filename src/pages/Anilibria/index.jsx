import { useEffect } from "react";
import AnilibriaService from "../../entities/anilibria/index.js";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useSearch } from "../../widgets/Anilibria/context/SearchContext.jsx";
import PageHeader from "../../widgets/PageHeader/index.js";
import { AnilibiriaCard, AnilibiriaSearchInput } from "../../widgets/Anilibria/index.js";
import stl from './index.module.css';

export const Anilibria = () => {
    const { getAnimeCatalog, searchAnime } = AnilibriaService();
    const { 
        searchTerm, 
        searchResults, 
        setSearchResults, 
        isSearching, 
        setIsSearching 
    } = useSearch();

    useEffect(() => {
        const controller = new AbortController();
        
        const fetchData = async () => {
            setIsSearching(true);
            
            try {
                const response = searchTerm 
                    ? await searchAnime(searchTerm)
                    : await getAnimeCatalog();
                
                setSearchResults(response);
            } catch (error) {
                console.error("Ошибка поиска:", error);
            } finally {
                setIsSearching(false);
            }
        };
        
        const timer = setTimeout(fetchData, 500);
        
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [searchTerm]);

    return (
        <>
            <PageHeader title='Каталог релизов'>
                <AnilibiriaSearchInput />
            </PageHeader>
            
            <div className={stl.wrapper}>
                {isSearching ? (
                    <div className={stl.loading}>
                        <ProgressSpinner />
                    </div>
                ) : searchResults.length === 0 ? (
                    <div className={stl.noResults}>
                        {searchTerm ? 'Ничего не найдено' : 'Каталог пуст'}
                    </div>
                ) : (
                    searchResults.map(item => (
                        <AnilibiriaCard 
                            key={item.id} 
                            item={item} 
                            searchTerm={searchTerm}
                        />
                    ))
                )}
            </div>
        </>
    );
};