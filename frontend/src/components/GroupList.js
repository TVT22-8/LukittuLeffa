// GroupList.js
import React from 'react';
import { Link } from 'react-router-dom';

const GroupList = () => {
  const groups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    // Add more groups as needed
  ];

  return (
    <div className="group-list-container">
      <div className="content">
        <h2>Group List</h2>
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              <Link to={`/groups/${group.id}`}>{group.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupList;