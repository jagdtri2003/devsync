import React from 'react';
import { useUser } from '@clerk/clerk-react';

function UsersPanel({ users }) {
  // This would be populated with actual user data in a real implementation
  const { user } = useUser();
  return (
    <div>
      <h3 className="panel-title">Active Users</h3>
      
      <div className="panel-section">
        {users.length > 0 ? (
          <div className="users-list">
            {users.map(us => (
              <div key={us.id} className="user-item">
                <div className={`user-status ${us.status || 'online'}`}></div>
                <div className="user-name">{user.username === us.name ? 'You' : us.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="panel-placeholder">No active users</div>
        )}
      </div>
    </div>
  );
}

export default UsersPanel;
