// Group.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './GroupList.css'; // Import your CSS file

const Group = () => {
  const { id } = useParams();
  const group = { id, name: `Group ${id}`, description: 'Group description' };

  return (
    <div className="group-detail-container">
      <h2>{group.name}</h2>
      <p>{group.description}</p>
    </div>
  );
};

export default Group;