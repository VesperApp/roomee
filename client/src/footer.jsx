import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

const Footer = () => (
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Roomee</strong> by <a href="https://github.com/VesperApp">Vesper App.</a>
        <Link to="/presentation" className="level-item">
          Learn more about this website.
        </Link>
      </p>
    </div>
  </footer>
);

export default Footer;
