// Group.js
import React, { useState, useEffect } from 'react';
import GroupItem from '../GroupItem';

const Group = () => {
  const [groups, setGroups] = useState([]); // Fetch groups from your database

  // Example: Fetch groups from your database
  useEffect(() => {
    // Your API call or database query to get groups
    // Update the groups state with the result
    // For example:
    // const fetchedGroups = fetchGroupsFromDatabase();
    // setGroups(fetchedGroups);
  }, []);

  return (
    <div className="group-page">
      <div className="in-group-section">
        <h2>Groups You Are In</h2>
        <div className="group-list">
          {groups.map(group => (
            <GroupItem key={group.id} group={group} isInGroup={true} />
          ))}
        </div>
      </div>

      <div className="not-in-group-section">
        <h2>Groups You Are Not In</h2>
        <div className="group-list">
          {groups.map(group => (
            <GroupItem key={group.id} group={group} isInGroup={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;