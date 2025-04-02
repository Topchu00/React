import axios from "axios";

export async function fetchAnimeList() {
  try {
    const response = await axios.get(
      "https://anilibria.top/api/v1/anime/catalog/releases?page=1&limit=30"
    );
    return response.data.data || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
}