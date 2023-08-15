import React from 'react';
import './Followers.css'; // Import your CSS file for styling

// Fake follower data
const fakeFollowers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
  // ... add more fake followers here
];

function Followers() {
  return (
    <div className="followers-container">
      {fakeFollowers.map(follower => (
        <div key={follower.id} className="follower-item">
          <div className="serial-number">{follower.id}</div>
          <i class="fa fa-user fa-lg"></i>
          <div className="follower-details">
            <div className="name">{follower.name}</div>
            <div className="email">{follower.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Followers;
