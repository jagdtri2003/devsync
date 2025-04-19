import React from 'react';

function UsersPanel({ users }) {
  // This would be populated with actual user data in a real implementation

  return (
    <div>
      <h3 className="panel-title">Active Users</h3>
      
      <div className="panel-section">
        {users.length > 0 ? (
          <div className="users-list">
            {users.map(user => (
              <div key={user.id} className="user-item">
                <div className={`user-status ${user.status || 'online'}`}></div>
                <div className="user-name">{user.name}</div>
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
