const useText = () => {
    const getSlicedText = (text, start, end, emptyMessage = 'Нет описания') => {
        if (typeof text !== 'string') return emptyMessage;
        if (!text.trim()) return emptyMessage;
        if (text.length > end) return `${text.slice(start, end)}...`;
        return text;
    }

    const highlightSearchTerm = (text, term) => {
        if (!term || !text) return text;
        
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    return { 
        getSlicedText,
        highlightSearchTerm 
    };
}

export default useText;