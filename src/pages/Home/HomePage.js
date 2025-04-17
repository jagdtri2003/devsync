import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Code Collaboration <span>Reimagined</span>
            </h1>
            <p className="hero-subtitle">
              DevSync is a real-time collaborative IDE that transforms how development teams work together.
              Write, review, and ship code faster with seamless collaboration.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                Get Started Free
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/pricing')}>
                View Pricing
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="browser-mockup">
              <div className="browser-header">
                <div className="browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="browser-address">devsync.io/editor</div>
              </div>
              <div className="browser-content">
                <div className="code-editor-preview">
                  <div className="editor-sidebar">
                    <div className="sidebar-item active"></div>
                    <div className="sidebar-item"></div>
                    <div className="sidebar-item"></div>
                  </div>
                  <div className="editor-main">
                    <div className="code-line"><span className="line-number">1</span><span className="code-keyword">import</span> React <span className="code-keyword">from</span> <span className="code-string">'react'</span>;</div>
                    <div className="code-line"><span className="line-number">2</span></div>
                    <div className="code-line"><span className="line-number">3</span><span className="code-keyword">const</span> <span className="code-function">App</span> = () {'=>'} {'{'}</div>
                    <div className="code-line active"><span className="line-number">4</span>  <span className="code-keyword">return</span> (</div>
                    <div className="code-line"><span className="line-number">5</span>    &lt;<span className="code-tag">div</span>&gt;</div>
                    <div className="code-line"><span className="line-number">6</span>      &lt;<span className="code-tag">h1</span>&gt;Hello DevSync!&lt;/<span className="code-tag">h1</span>&gt;</div>
                    <div className="code-line"><span className="line-number">7</span>    &lt;/<span className="code-tag">div</span>&gt;</div>
                    <div className="code-line"><span className="line-number">8</span>  );</div>
                    <div className="code-line"><span className="line-number">9</span>{'}'}</div>
                    <div className="code-line"><span className="line-number">10</span></div>
                    <div className="code-line"><span className="line-number">11</span><span className="code-keyword">export</span> <span className="code-keyword">default</span> App;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Developers</h2>
            <p className="section-subtitle">Tools designed to enhance your collaborative coding experience</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Real-time Collaboration</h3>
              <p className="feature-description">
                Code together in real-time with teammates. See cursors, selections, and changes instantaneously.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Integrated Development</h3>
              <p className="feature-description">
                Full-featured editor with syntax highlighting, autocomplete, and multi-language support.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">Team Chat</h3>
              <p className="feature-description">
                Built-in chat for discussions without leaving your IDE. Share code snippets with ease.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-description">
                Enterprise-grade security with end-to-end encryption. Your code stays private and protected.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Optimized for performance with minimal latency, even with multiple collaborators.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Cloud Sync</h3>
              <p className="feature-description">
                Access your projects from anywhere. Changes are saved automatically in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Trusted by developers and teams worldwide</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"DevSync has completely transformed how our remote team collaborates on code. It's like having everyone in the same room."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder">JS</div>
                </div>
                <div className="testimonial-info">
                  <h4>Jennifer Smith</h4>
                  <p>CTO, TechFlow</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The best thing about DevSync is how seamlessly it fits into our existing workflow. Impressive performance even with large codebases."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder">MR</div>
                </div>
                <div className="testimonial-info">
                  <h4>Michael Rodriguez</h4>
                  <p>Lead Developer, Innovate Labs</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"We've tried many collaborative coding tools, but DevSync stands out for its reliability and intuitive interface. A game-changer for our team."</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <div className="avatar-placeholder">SP</div>
                </div>
                <div className="testimonial-info">
                  <h4>Sarah Parker</h4>
                  <p>Engineering Manager, DataSphere</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to transform your team's coding experience?</h2>
            <p className="cta-subtitle">Join thousands of developers who've upgraded to DevSync.</p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                Sign Up Free
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/pricing')}>
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;