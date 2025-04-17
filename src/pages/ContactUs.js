import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';
import Layout from '../components/layout/Layout';
import './ContactUs.css';

const ContactUs = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: null, message: '' });

  // Replace with your actual Web3Forms access key
  const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult({ success: null, message: '' });

    try {
      const formEndpoint = 'https://api.web3forms.com/submit';
      
      const formPayload = {
        ...formData,
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: 'DevSync Contact Form',
        subject: `[DevSync] ${formData.subject}`
      };

      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.message || 'Something went wrong. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'An error occurred while sending your message. Please try again later.'
      });
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className={`contact-page ${theme}`}>
        <div className="container">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Have a question or want to learn more about DevSync? We'd love to hear from you!</p>
          </div>

          <div className="contact-content">
            <div className="contact-form-container">
              <h2>Send us a message</h2>
              
              {submitResult.success === true ? (
                <div className="success-message">
                  <i className="fas fa-check-circle"></i>
                  <p>{submitResult.message}</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="6" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  {submitResult.success === false && (
                    <div className="error-message">
                      <p>{submitResult.message}</p>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Our Location</h3>
                <p>123 Tech Street, San Francisco, CA 94101</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Email Us</h3>
                <p>info@devsync.com</p>
                <p>support@devsync.com</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri, 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-comments"></i>
                </div>
                <h3>Live Chat</h3>
                <p>Available 24/7 for premium users</p>
                <button className="chat-button">Start Chat</button>
              </div>
            </div>
          </div>
          
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What is DevSync?</h3>
                <p>DevSync is a collaborative coding platform designed to help teams work together in real-time, regardless of location. It includes features like live code editing, chat, and seamless version control integration.</p>
              </div>
              
              <div className="faq-item">
                <h3>Is there a free trial?</h3>
                <p>Yes! We offer a 30-minute free trial so you can explore DevSync and see if it's right for your team. No credit card required.</p>
              </div>
              
              <div className="faq-item">
                <h3>How many people can collaborate at once?</h3>
                <p>Our standard plan supports up to 5 simultaneous users, while our premium plans support 10-50 users depending on the tier.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I integrate with GitHub or GitLab?</h3>
                <p>Absolutely! DevSync seamlessly integrates with major version control systems including GitHub, GitLab, and Bitbucket.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs; 