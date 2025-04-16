import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { useSearch } from '../../context/SearchContext';
import stl from './index.module.css';

const Search = () => {
    const { searchTerm, setSearchTerm, setIsSearching } = useSearch();

    const handleChange = (value) => {
        setSearchTerm(value);
        setIsSearching(!!value);
    };

    return (
        <FloatLabel className={stl.wrapper}>
            <InputText
                className={stl.input}
                id="search"
                value={searchTerm}
                onChange={(e) => handleChange(e.target.value)}
            />
            <label htmlFor="search">Поиск по каталогу</label>
            {searchTerm && (
                <button 
                    className={stl.clearBtn} 
                    onClick={() => handleChange('')}
                    aria-label="Очистить поиск"
                >
                    ×
                </button>
            )}
        </FloatLabel>
    );
};

export default Search;