import React from 'react';
import { UserProfile } from '@clerk/clerk-react';
import { FaUser, FaUserPlus, FaShieldAlt } from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import './UserProfilePage.css';

const UserProfilePage = () => {
  return (
    <Layout>
      <div className="user-profile-page">
        <UserProfile path="/user-profile" routing="path">
          <UserProfile.Page label="Subscription" url="subscription" labelIcon={<FaUserPlus />}>
            <div className="custom-profile-page">
              <h1>Your Subscription</h1>
              <div className="subscription-info">
                <div className="subscription-card">
                  <div className="subscription-header">
                    <h2>Current Plan</h2>
                    <span className="badge free">Free</span>
                  </div>
                  <div className="subscription-details">
                    <p>Features included:</p>
                    <ul>
                      <li>Single user access</li>
                      <li>Basic code editor</li>
                      <li>30-minute sessions</li>
                      <li>Limited file storage</li>
                    </ul>
                  </div>
                  <button className="btn btn-primary upgrade-btn">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            </div>
          </UserProfile.Page>
          
          <UserProfile.Page label="Security" labelIcon={<FaShieldAlt />} />
          <UserProfile.Page label="account" labelIcon={<FaUser />} />
        </UserProfile>
      </div>
    </Layout>
  );
};

export default UserProfilePage; 