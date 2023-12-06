// GroupItem.js
import React from 'react';
import './GroupItem.css'; // Import your CSS file


const Group = ({ group, isInGroup }) => {
  return (
    <div className={`group-item ${isInGroup ? 'in-group' : 'not-in-group'}`}>
      <h3>{group.name}</h3>
      {/* Add other group information or actions */}
    </div>
  );
};

export default Group;