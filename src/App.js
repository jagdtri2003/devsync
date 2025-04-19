import { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-react';
import './App.css';

// Pages
import HomePage from './pages/Home/HomePage';
import PricingPage from './pages/Pricing/PricingPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ContactUs from './pages/ContactUs';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import EditorComponent from './pages/Editor/EditorComponent';

// Context for theme (dark/light mode)
export const ThemeContext = createContext();

// The Clerk publishable key from environment variable
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "pk_test_placeholder-key";

function App() {
  const [theme, setTheme] = useState('light');
  
  // Toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };
  
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className={`App ${theme}`}>
          <Router>
            <Routes>
              {/* Home route with conditional redirect */}
              <Route 
                path="/" 
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                      <HomePage />
                    </SignedOut>
                  </>
                } 
              />
              
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactUs />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <>
                    <SignedIn>
                      <DashboardPage />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/login" replace />
                    </SignedOut>
                  </>
                } 
              />
              
              <Route 
                path="/user-profile/*" 
                element={
                  <>
                    <SignedIn>
                      <UserProfilePage />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/login" replace />
                    </SignedOut>
                  </>
                } 
              />
              
              {/* Authentication Routes */}
              <Route 
                path="/login" 
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                      <LoginPage />
                    </SignedOut>
                  </>
                } 
              />
              
              <Route 
                path="/signup" 
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                      <SignupPage />
                    </SignedOut>
                  </>
                } 
              />
              <Route path="/editor/:id" element={
                <>
                  <SignedIn>
                    <EditorComponent />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              } />
              <Route path="/editor/shared/:id" element={
                <>
                  <SignedIn>
                    <EditorComponent />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              } />
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </div>
      </ThemeContext.Provider>
    </ClerkProvider>
  );
}

export default App;
