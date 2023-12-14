import React, { useState, useEffect } from 'react';
import useUserId from './useUserId';
//import { Button } from '../../Button';
import { Card, Button, CardBody, Form } from 'react-bootstrap';

const GroupFetch = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState();
  const [dText, setDtext] = useState();
  const userId = useUserId();

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroups();
  }, []);

  const addGroup = async () => {


    if (userId == null) {
      alert('Not logged in');
      return;
    }

    const grup = {
      'gName': groupName,
      'description': dText,
      'ownerId': userId[0].userid
    }
    console.log('adding group', grup);
    try {
      const response = await fetch(`http://localhost:3002/db/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include additional data in the request body if needed
        body: JSON.stringify(grup),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Group:', result);
        alert('Added group');
      } else {
        console.error('Failed to send group:', response.statusText);
        alert('Failed to create group');
      }
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

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
      <br />
      <label>
        Group name:
        <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={dText} onChange={(e) => setDtext(e.target.value)} />
      </label>
      <Button onClick={() => addGroup()}>Create Group</Button>
      <br />
      <br />

      {groups.map((group) => (
        <Card key={group.groupid} style={{ marginBottom: '15px' }}>
          <Card.Body>
            <Card.Title>{` ${group.groupname}`}</Card.Title>
            <Card.Text>{`Group Description: ${group.description}`}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GroupFetch;