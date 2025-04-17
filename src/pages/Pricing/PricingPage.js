import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import './PricingPage.css';
import { useUser } from '@clerk/clerk-react';

const PricingPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { user } = useUser();
  
  const handleSubscribe = (plan) => {
    // In a real app, this would handle subscription logic
    if(user){
      user.update({
        unsafeMetadata: {
          plan: plan,
          billingCycle: billingCycle,
        },
      });
    }
    alert(`Subscribing to ${plan} plan (${billingCycle} billing)`);
  };
  
  return (
    <Layout>
      <div className="pricing-page">
        <div className="container">
          <div className="section-header">
            <h1 className="section-title">Pricing Plans</h1>
            <p className="section-subtitle">
              Choose the perfect plan for your needs. All plans include our core features.
            </p>
            
            <div className="billing-toggle">
              <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
              <label className="toggle">
                <input 
                  type="checkbox" 
                  checked={billingCycle === 'yearly'} 
                  onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                />
                <span className="slider"></span>
              </label>
              <span className={billingCycle === 'yearly' ? 'active' : ''}>
                Yearly <span className="discount">Save 20%</span>
              </span>
            </div>
          </div>
          
          <div className="pricing-grid">
            {/* Free Plan */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3 className="pricing-title">Free</h3>
                <div className="pricing-price">
                  <span className="price">₹0</span>
                  <span className="period">forever</span>
                </div>
                <p className="pricing-description">
                  Perfect for personal projects and individual developers.
                </p>
              </div>
              
              <ul className="pricing-features">
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">2 personal projects</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Basic code editor</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Collaborate with 5 person</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Community support</span>
                </li>
                <li className="feature-disabled">
                  <span className="feature-icon">✕</span>
                  <span className="feature-text">Custom themes</span>
                </li>
                <li className="feature-disabled">
                  <span className="feature-icon">✕</span>
                  <span className="feature-text">Advanced editor features</span>
                </li>
              </ul>
              
              <button className="btn btn-outline pricing-btn" onClick={() => navigate('/signup')}>
                { user ? user.unsafeMetadata.plan === 'Free' ? 'Current Plan' : 'Dashboard' : 'Get Started'}
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="pricing-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
                <h3 className="pricing-title">Pro</h3>
                <div className="pricing-price">
                  <span className="price">
                  ₹{billingCycle === 'monthly' ? '500' : '400'}
                  </span>
                  <span className="period">
                    per user / {billingCycle === 'monthly' ? 'month' : 'month, billed yearly'}
                  </span>
                </div>
                <p className="pricing-description">
                  For professional developers who need more power and flexibility.
                </p>
              </div>
              
              <ul className="pricing-features">
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Unlimited personal projects</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Advanced code editor</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Collaborate with up to 10 people</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Priority email support</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Custom themes & extensions</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Advanced editor features</span>
                </li>
              </ul>
              
              <button className="btn btn-primary pricing-btn" onClick={() => handleSubscribe('Pro')}>
                { user ? user.unsafeMetadata.plan === 'Pro' ? 'Current Plan' : 'Subscribe Now' : 'Get Started'}
              </button>
            </div>
            
            {/* Team Plan */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3 className="pricing-title">Team</h3>
                <div className="pricing-price">
                  <span className="price">
                    ₹{billingCycle === 'monthly' ? '1000' : '800'}
                  </span>
                  <span className="period">
                    per user / {billingCycle === 'monthly' ? 'month' : 'month, billed yearly'}
                  </span>
                </div>
                <p className="pricing-description">
                  For teams that need collaboration and management features.
                </p>
              </div>
              
              <ul className="pricing-features">
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Unlimited team projects</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Everything in Pro</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Unlimited collaborators</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">24/7 dedicated support</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Admin dashboard</span>
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  <span className="feature-text">Advanced security features</span>
                </li>
              </ul>
              
              <button className="btn btn-secondary pricing-btn" onClick={() => handleSubscribe('Team')}>
                { user ? user.unsafeMetadata.plan === 'Team' ? 'Current Plan' : 'Subscribe Now' : 'Get Started'}
              </button>
            </div>
          </div>
          
          <div className="pricing-faq">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Can I upgrade or downgrade my plan later?</h3>
                <p>Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit for your next billing cycle.</p>
              </div>
              
              <div className="faq-item">
                <h3>What payment methods do you accept?</h3>
                <p>We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Team plans, we also offer invoice payments.</p>
              </div>
              
              <div className="faq-item">
                <h3>Do you offer a free trial?</h3>
                <p>Yes, you can try DevSync for free for 30 minutes without providing payment information. For paid plans, we offer a 14-day free trial.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I cancel my subscription anytime?</h3>
                <p>Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.</p>
              </div>
            </div>
          </div>
          
          <div className="pricing-cta">
            <h2>Still have questions?</h2>
            <p>Contact our sales team for a personalized demo and discussion about your specific needs.</p>
            <button className="btn btn-outline">Contact Sales</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage; 