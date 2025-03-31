import { useState, useEffect } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { useDebounce } from "../../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { ProgressSpinner } from 'primereact/progressspinner';
import './index.css';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const debouncedSearch = useDebounce(search, 300);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                setIsLoading(true);
                const params = new URLSearchParams({
                    page: currentPage + 1, // API может ожидать 1-based индекс
                    limit: itemsPerPage,
                    search: debouncedSearch || undefined
                });

                const response = await axios.get(
                    `https://anilibria.top/api/v1/title/search?${params}`
                );

                setAnimeList(response.data.list || []);
                setTotalPages(Math.ceil((response.data.pagination?.total_items || 0) / itemsPerPage));
            } catch (error) {
                console.error("Ошибка загрузки аниме:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnime();
    }, [debouncedSearch, currentPage]);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
        }}>
            {/* Поле поиска */}
            <div className="p-inputgroup" style={{ marginBottom: "20px", width: "100%" }}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="text"
                        placeholder="Поиск аниме..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-inputtext-lg"
                        style={{ width: "100%" }}
                    />
                </span>
            </div>

            {/* Состояние загрузки */}
            {isLoading && <ProgressSpinner style={{width: '50px', height: '50px'}} />}

            {/* Контейнер списка аниме */}
            <div style={{ width: "100%", flexGrow: 1 }}>
                {!isLoading && animeList.length === 0 ? (
                    <p>Ничего не найдено...</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {animeList.map((anime) => (
                            <li
                                key={anime.id}
                                style={{
                                    padding: "15px",
                                    borderBottom: "1px solid #ddd",
                                    borderRadius: "5px",
                                    background: "#fff",
                                    marginBottom: "10px",
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                <h3>{anime.names.ru}</h3>
                                <p>{anime.description?.slice(0, 150)}...</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
                <ReactPaginate
                    previousLabel={"←"}
                    nextLabel={"→"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    forcePage={currentPage}
                    style={{
                        display: 'flex',
                        listStyle: 'none',
                        padding: 0,
                        gap: '10px',
                        marginTop: '20px'
                    }}
                />
            )}
        </div>
    );
};

export default AnimeList;