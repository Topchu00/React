import axios from "axios";

const AnilibriaService = () => {
    const BASE_URL = 'https://anilibria.top/api/v1'

    const getAnimeCatalog = async () => {
        try {
            const {data} = await axios.get(`${BASE_URL}/anime/catalog/releases`)
            return data.data
        } catch (error) {
            console.log(error)
        }
    }

    const getAnimeByIdentifier = async (identifier) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/anime/releases/${identifier}`);
            console.log("Данные получены:", data); // Добавьте лог
            return data.data || data; // В зависимости от структуры ответа
        } catch (error) {
            console.log("Ошибка запроса:", error.response?.data || error.message);
            throw error; // Пробросьте ошибку для обработки в компоненте
        }
    }

    const searchAnime = async (query) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/app/search/releases`, {
                params: { query }
            });
            return data.data || data;
        } catch (error) {
            console.log("Ошибка поиска:", error);
            throw error;
        }
    };

    return {
        getAnimeCatalog,
        getAnimeByIdentifier,
        searchAnime
    }
}

export default AnilibriaService;