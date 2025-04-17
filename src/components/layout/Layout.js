import { useContext } from 'react';
import { ThemeContext } from '../../App';
import Navbar from './Navbar';
import Footer from './Footer';

import './Layout.css';

const Layout = ({ children, hideFooter = false }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className={`layout ${theme}`}>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout; 