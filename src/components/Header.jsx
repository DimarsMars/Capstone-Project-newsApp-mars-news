import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Header() {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
          navigate(`/search?q=${query}`); // Navigasi ke halaman search dengan query string
          setQuery(""); // Mengosongkan input setelah navigasi
        }
      };

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-1">
            <div className="container">
            <nav className="navbar navbar-dark bg-dark p-1">
            <a className="navbar-brand" href="#">
                <span className="text-light fw-bold" style={{ fontSize: '25px' }}>Mars</span>
                <span className="text-danger fw-bold" style={{ fontSize: '25px' }}>.</span>
                <span className="text-danger fw-bold" style={{ fontSize: '25px' }}>News</span>
            </a>
        </nav>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Indonesia</Link>
                        <Link className="nav-link" to="/programming">Programming</Link>
                        <Link className="nav-link" to="/saved">Saved</Link>
                    </div>
                </div>

                <nav className="navbar navbar-dark bg-dark">
                    <div className="container">
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
                            <div className="">
                                <button className="btn btn-outline-light d-flex align-items-center" type="submit" onClick={handleSearch} ><i className="bi bi-search me-2"></i>Search</button>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
        </nav>
    );
}

export default Header;