import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="not-found-page">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
            >
              Return Home
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage; 