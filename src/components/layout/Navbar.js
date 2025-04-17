import { useState, useContext } from 'react';
import { Link} from 'react-router-dom';
import { useUser, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react';
import { ThemeContext } from '../../App';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoaded, user } = useUser();
  const title = {Free:"Free Plan",Pro:"Pro Plan",Team:"Enterprise Plan"}

  return (
    <nav className={`navbar ${theme}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">DevSync</span>
        </Link>

        <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <ul>
            <SignedOut>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            </SignedOut>
            <SignedIn>
              <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
            </SignedIn>
            <li><Link to="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          </ul>
        </div>

        <div className={`navbar-actions ${menuOpen ? 'active' : ''}`}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          <SignedIn>
            <div className="user-profile-wrapper">
              {isLoaded && user && (
                <div className="user-subscription">
                  <span title={title[user.unsafeMetadata.plan] || "Free Plan"} className="subscription-badge">{user.unsafeMetadata.plan || "Free"}</span>
                </div>
              )}
              <UserButton>
                <UserButton.UserProfilePage label="Subscription" url="/user-profile" labelIcon="🎯">
                  <h1>Subscription</h1>
                </UserButton.UserProfilePage>
              </UserButton>
            </div>
          </SignedIn>
          
          <SignedOut>
            <Link to="/login" className="btn btn-outline">Log in</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 