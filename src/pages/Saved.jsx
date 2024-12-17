import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNews } from '../redux/reducers/savedSlices';

function Saved() {
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.news.savedNews);

  const handleRemoveNews = (news) => {
    dispatch(removeNews(news));
  };

  return (
    <div className='' style={{ minHeight: "72vh"}}>
      <div className="container text-center mt-5 mb-5">
        <h2 className="fw-bold">Saved News</h2>
      </div>
      <div className="d-flex flex-wrap gap-1 justify-content-center container" style={{ marginBottom: "90px" }}>
        {savedNews.map((news, index) => (
          <div className="card blur-container container mt-3 mb-3 d-flex hover-card" style={{ width: "25rem" }} key={index}>
            <p className="fw-bold" style={{ fontSize: "15px" }}>{news.source}</p>
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
            <div className="card-body d-flex flex-column" style={{ height: "fit-content" }}>
              <h4 className="card-text">{news.headline.main}</h4>
              <p className="text-align-justify" style={{ fontSize: "13px" }}>{news.lead_paragraph}</p>
              <div className="mt-auto d-flex justify-content-center gap-3">
                  <a href={news.web_url} className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">Read More</a>
                  <button className="btn btn-danger" onClick={() => handleRemoveNews(news)}>Unsaved</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;