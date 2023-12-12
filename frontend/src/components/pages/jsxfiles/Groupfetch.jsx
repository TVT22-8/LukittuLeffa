import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const GroupFetch = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:3002/db/groups');
      const data = await response.json();
      console.log(data);

      if (response.ok && data.length > 0) {
        // Set the entire array of groups in the state
        setGroups(data);
      } else {
        console.error('Error fetching group information:', data.message);
      }
    } catch (error) {
      console.error('Error fetching group information:', error);
    }
  };

  return (
    <div>
      {groups.map((group) => (
        <Card key={group.groupid} style={{ marginBottom: '15px' }}>
          <Card.Body>
            <Card.Title>{` ${group.groupid}`}</Card.Title>
            <Card.Text>{`Group Description: ${group.description}`}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GroupFetch;