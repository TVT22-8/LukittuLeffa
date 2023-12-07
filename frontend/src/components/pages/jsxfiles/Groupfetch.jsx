import React, { useState, useEffect } from 'react';

const GroupFetch = () => {
  const [groupId, setGroupId] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:3002/db/groups');
      const data = await response.json();
      console .log(data);

      if (response.ok && data.length > 0) {
        // Assuming the first group in the response is the one you want to display
        const firstGroup = data[0];
        setGroupId(firstGroup.groupid.toString()); // Assuming groupid is a number
        setGroupDescription(firstGroup.description);
      } else {
        console.error('Error fetching group information:', data.message);
      }
    } catch (error) {
      console.error('Error fetching group information:', error);
    }
  };

  return (
    <div>
      <label>
        Group ID:
        <input type="text" value={groupId} readOnly />
      </label>
      <p>Group Description: {groupDescription}</p>
    </div>
  );
};

export default GroupFetch;