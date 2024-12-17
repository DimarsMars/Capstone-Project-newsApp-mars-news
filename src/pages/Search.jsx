import React, { useState, useEffect, } from "react";
import { useLocation } from "react-router-dom";
import { useNewsApi } from "../api/useNewsApi";
import { useDispatch, useSelector } from "react-redux";
import { addNews, removeNews } from "../redux/reducers/savedSlices";

function Search() {

    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q"); // untuk mengmbil query dari URL
    const [page, setPage] = useState(1);
    const savedNews = useSelector((state) => state.news.savedNews);
    const { data: news, isLoading, isError, error } = useNewsApi(query, page);
  
    useEffect(() => {
      setPage(1); // untuk mereset ke halaman pertama saat query berubah
    }, [query]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSaveNews = (news) => {
        dispatch(addNews(news));
    };

    const handleRemoveNews = (news) => {
        dispatch(removeNews(news));
    };

    const isNewsSaved = (news) =>
      savedNews.some((item) => item.web_url === news.web_url);

    return (
    <div>
        <div className="container text-center mt-5 mb-5">
            <h2 className="fw-bold">{query} News</h2>
        </div>

      {/* Menampilkan Status */}
      {isLoading && (<div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>)}
      {isError && <p>Something went wrong!</p>}

      {/* Menampilkan News */}
      {!isLoading && !isError && news?.length > 0 && (
        <div className="d-flex flex-wrap gap-3 justify-content-center container mt-4">
          {news.map((news, index) => (
            <div className="card blur-container mt-3 mb-3 d-flex hover-card" style={{ width: "25rem" }} key={index}>
              <p className="" style={{ fontSize: "13px" }}>
                {news.source || "Unknown Source"}
              </p>
              {news.multimedia?.[0]?.url ? (
                <img
                  src={`http://static01.nyt.com/${news.multimedia[0].url}`}
                  className="card-img-top"
                  alt="News"
                />
              ) : (
                <img src="/No Image MarsNews.png" className="card-img-top" alt="No Images" />
              )}
              <div className="card-body d-flex flex-column" style={{ height: "fit-content" }}>
                <h4 className="card-text">{news.headline.main}</h4>
                <p className="text-align-justify" style={{ fontSize: "13px" }}>
                  {news.abstract || news.lead_paragraph || "No Description Available"}
                </p>
                <div className="d-flex justify-content-center mb-5">
                  <a href={news.web_url} className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">Read More</a>
                </div>
                <div className="mt-auto d-flex justify-content-center">
                  {isNewsSaved(news) ? (
                      <button className="btn btn-danger" onClick={() => handleRemoveNews(news)}>Unsaved</button>
                        ) : (
                      <button className="btn btn-primary me-2" onClick={() => handleSaveNews(news)}>Save</button>
                        )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Jika Tidak Ada Hasil */}
      {!isLoading && !isError && news?.length === 0 && (
        <div>
          <p className="text-center mt-4 fw-bold" style={{ height: "60vh" }}>No results found for "{query}".</p>
        </div>
      )}

      {/* Pagination */}
      {news?.length > 0 && (
        <div className="d-flex justify-content-center align-items-center mt-4 mb-5">
          <button
            className="btn btn-dark me-2"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            >Previous</button>
          <button
            className="btn btn-dark ms-2"
            onClick={() => handlePageChange(page + 1)}
            >Next</button>
        </div>
      )}
    </div>
    )
}

export default Search;