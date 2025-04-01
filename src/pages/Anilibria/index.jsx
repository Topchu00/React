import AnimeList from "./AnimeList";
import './index.css';

export default function AnilibriaPage() {
  return (
    <div className="anilibria-page">
      <h1 className="page-title">Каталог аниме</h1>
      <AnimeList />
    </div>
  );
}