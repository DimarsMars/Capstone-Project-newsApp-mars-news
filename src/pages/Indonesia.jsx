import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNewsApi } from "../api/useNewsApi";
import { addNews, removeNews } from "../redux/reducers/savedSlices";

const Indonesia = () => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const savedNews = useSelector((state) => state.news.savedNews);
  const { data: news, isLoading, error } = useNewsApi("indonesia", page);

  if (isLoading) return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;

  if (error) return <div>Error: {error.message}</div>;
    
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
        <div className="">
          <div className="container text-center mt-5 mb-5">
            <h2 className="fw-bold">Indonesia</h2>
          </div>
          <div className="d-flex flex-wrap gap-1 justify-content-start container">
            {news.map((news, index) => (

                <div className="card blur-container container mt-3 mb-3 d-flex hover-card" style={{width: "25rem"}} key={index}>
                      <p className="fw-bold" style={{fontSize: "15px"}}>{news.source}</p>
                      {news.multimedia?.[0]?.url ? (
                        <img 
                          src={`http://static01.nyt.com/${news.multimedia[0].url}`} 
                          className="card-img-top" 
                          alt=""
                        />
                      ) : (
                        <img 
                          src="/No Image MarsNews.png" 
                          className="card-img-top" 
                          alt="No Images" 
                        />
                      )}
                    <div className="card-body d-flex flex-column" style={{height: "fit-content"}}>
                      <h4 className="card-text">{news.headline.main}</h4>
                      <p className="text-align-justify" style={{fontSize: "13px"}}>{news.lead_paragraph}</p>
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
          <div className="d-flex justify-content-center align-items-center " style={{marginBottom: "90px", marginTop: "30px"}}>
            <button
              className="btn btn-dark me-2 btn-pad"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              >Previous</button>
            <button
              className="btn btn-dark ms-2 btn-pad"
              onClick={() => handlePageChange(page + 1)}
              >Next</button>
          </div>
        </div>
      );
}

export default Indonesia;