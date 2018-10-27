import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>
        <strong>Roomee</strong> by <a href="https://github.com/VesperApp">Vesper App</a>.
        <Link to="/presentation" className="level-item">
          Learn more about this project.
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
