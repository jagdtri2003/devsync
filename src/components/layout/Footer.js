import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';

import './Footer.css';

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer className={`footer ${theme}`}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-title">DevSync</h3>
            <p className="footer-description">
              The next-generation collaborative IDE for teams to code together in real-time, 
              regardless of location.
            </p>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><Link to="/">Overview</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Roadmap</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Tutorials</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} DevSync. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 