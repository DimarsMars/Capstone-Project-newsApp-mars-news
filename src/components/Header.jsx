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
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-1">
            <div className="container">
                <a className="navbar-brand">Mars.News</a>
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

                {/* Search */}
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container">
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
                            <button className="btn btn-outline-dark" type="submit" onClick={handleSearch}>Search</button>
                        </form>
                    </div>
                </nav>
            </div>
        </nav>
    );
}

export default Header;