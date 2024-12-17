import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-5">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} <strong>Mars.News</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;