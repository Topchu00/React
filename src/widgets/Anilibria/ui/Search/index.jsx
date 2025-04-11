import React from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

import stl from './index.module.css';

const Search = ({ value, onChange }) => {
    return (
        <FloatLabel className={stl.wrapper}>
            <InputText
                className={stl.input}
                id="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor="search">Поиск по каталогу</label>
            {value && (
                <button 
                    className={stl.clearBtn} 
                    onClick={() => onChange('')}
                    aria-label="Очистить поиск"
                >
                    ×
                </button>
            )}
        </FloatLabel>
    );
};

export default Search;