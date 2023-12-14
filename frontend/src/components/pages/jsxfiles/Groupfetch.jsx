import React, { useState, useEffect } from 'react';
import useUserId from './useUserId';
//import { Button } from '../../Button';
import { Card, Button, CardBody, Form, CardText } from 'react-bootstrap';
import OuterCard from './OuterCard';

const GroupFetch = () => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState();
  const [dText, setDtext] = useState();
  const [joinRequest, setJoinRequest] = useState();
  const userId = useUserId();

  useEffect(() => {
    // Fetch groups when the component mounts
    fetchGroups();
    fetchJoinRequest();
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

  const requestJoin = async (id) => {


    if (userId == null) {
      alert('Not logged in');
      return;
    }

    const join = {
      'uId': userId[0].userid,
      'groupId': id.groupid
    }
    try {
      const response = await fetch(`http://localhost:3002/db/groups/member/joinrequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include additional data in the request body if needed
        body: JSON.stringify(join),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Gjoin:', result);
        alert('Join request send');
      } else {
        console.error('Failed to send join request:', response.statusText);
        alert('Failed to send join request');
      }
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const fetchJoinRequest = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/groups/admin/joinrequests/${userId[0].userid}`);
      const data = await response.json();
      console.log('fetch join request' ,data);

      if (response.ok) {
        // Set the entire array of groups in the state
        setJoinRequest(data);
        console.log('fetchJoin' , joinRequest);
      } else {
        console.error('Error fetching join requests:', data.message);
      }
    } catch (error) {
      console.error('Error fetching join requests:', error);
    }
  };

  const acceptJoin = async (id) => {


    if (userId == null) {
      alert('Not logged in');
      return;
    }

    const join = {
      'uId': id.userlukittu_userid,
      'groupId': id.watchgroup_groupid
    }
    console.log('package' ,join);
    try {
      const response = await fetch(`http://localhost:3002/db/groups/admin/joinrequests/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include additional data in the request body if needed
        body: JSON.stringify(join),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('acceptjoin:', result);
        fetchJoinRequest();
      } else {
        console.error('Failed to accept join request:', response.statusText);
        alert('Failed to accept join request');
      }
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const declineJoin = async (id) => {


    if (userId == null) {
      alert('Not logged in');
      return;
    }

    const join = {
      'uId': id.userlukittu_userid,
      'groupId': id.watchgroup_groupid
    }
    console.log('package' ,join);
    try {
      const response = await fetch(`http://localhost:3002/db/groups/admin/joinrequests/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // You can include additional data in the request body if needed
        body: JSON.stringify(join),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('acceptjoin:', result);
        fetchJoinRequest();
      } else {
        console.error('Failed to accept join request:', response.statusText);
        alert('Failed to accept join request');
      }
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };


  const fetchGroups = async () => {
    try {
      const response = await fetch('http://localhost:3002/db/groups');
      const data = await response.json();
      console.log('fetchgroups' ,data);

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

      <div style={{position: 'static'}}>
      <OuterCard style={{ overflowX: 'auto'}}>
      {joinRequest && (
        <div style={{display: 'inline-flex', flexDirection: 'row'}}>
          {joinRequest.map((show, index) => (
            <Card key={index} style={{width: '350px', height: '290px'}}>
              {index > 0 && <br />}
              <CardBody>
                <Card.Title>{show.groupname}</Card.Title>
                <br />
                <CardText>Username: {show.requester_username}</CardText>
                <br />
                <Button onClick={() => acceptJoin(show)} style={{display:'inline-flex', margin:'0 20px'}}>Accept</Button>
                <Button onClick={() => declineJoin(show)} style={{display:'inline-flex'}}>Decline</Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      </OuterCard>
      </div> 

      <br />

      {groups.map((group) => (
        <Card key={group.groupid} style={{ marginBottom: '15px' }}>
          <Card.Body>
            <Card.Title>{` ${group.groupname}`}</Card.Title>
            <Card.Text>{`Group Description: ${group.description}`}</Card.Text>
            <Button onClick={() => requestJoin(group)}>Request to join</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GroupFetch;