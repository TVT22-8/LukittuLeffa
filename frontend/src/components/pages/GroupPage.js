import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import '../GroupPage.css';
import Badge from 'react-bootstrap/Badge';
import RatingStars from './jsxfiles/Ratingstars';
import useUserId from './jsxfiles/useUserId';

const GroupPage = () => {
  let { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [reviews, setReviews] = useState([]);
  const user = useUserId();

    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/db/groups/${groupId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Assuming the API returns an array and we want the first item
        setGroupDetails(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3002/db/groups/members/reviews/${groupId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.message);
      
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/groups/chat/${groupId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchParticipants = async () => {
    try { 
      const response = await fetch(`http://localhost:3002/db/groups/members/${groupId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setParticipants(data);
      const loggedInUser = data.find(participant => participant.userid === user[0].userid);
      if (loggedInUser) {
        // Update your state or context to reflect the admin status.
        // This is just an example; adjust it to fit how you manage state/context.
        user[0].is_admin = loggedInUser.is_admin;
      }
    } catch (error) {
      setError(error.message);
    }
  };



  

  const fetchRecentMovies = async () => {
    try {
      const response = await fetch(`http://localhost:3002/db/groups/members/reviews/${groupId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecentMovies(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
  async function initFetch() {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchGroupDetails(),
        fetchMessages(),
        fetchParticipants(),
        fetchRecentMovies(),
        fetchReviews(),
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  initFetch();
}, [groupId]);



const handleSendMessage = async (event) => {
  event.preventDefault();

  if (!newMessage.trim()) return; // Prevent sending empty messages

  if (!user[0].userid || !groupId) {
    console.error('User ID or Group ID is missing');
    return;
  }

  try {
    const response = await fetch('http://localhost:3002/db/groups/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any other necessary headers, such as authorization tokens
      },
      body: JSON.stringify({
        uId: user[0].userid,
        groupId: groupId,
        chatText: newMessage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // If your server responds with JSON
    const data = await response.json();
    // Handle the response data if needed
    setNewMessage(''); // Clear the input after sending
    // Optionally update the chat messages to include the new one
    // e.g., setMessages(previousMessages => [...previousMessages, data]);

  } catch (error) {
    console.error('Error sending message:', error);
  }

    fetchMessages();
};

const kickUser = async (userIdToKick) => {
  // Check if the current user is admin before proceeding.
  if (!user[0].is_admin) {
    alert("You don't have permission to perform this action.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3002/db/groups/${groupId}/kick/${userIdToKick}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Include any other necessary headers, such as authorization tokens
      },
      body: JSON.stringify({
        adminId: user[0].userid, // Send the admin ID in the request body if needed
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Update the participants state to remove the kicked user
    setParticipants(participants.filter(participant => participant.userid !== userIdToKick));

  } catch (error) {
    console.error('Failed to kick user:', error);
    alert('Failed to kick user: ' + error.message);
  }
};

const handleDeleteGroup = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete this group?");
  if (confirmDelete) {
    try {
      // Assuming `user[0].userid` is the ID of the logged-in user who is also the admin
      const adminId = user[0].userid;

      const response = await fetch(`http://localhost:3002/db/groups/${groupId}/${adminId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include any other necessary headers such as authorization tokens
        },
      });

      if (!response.ok) {
        // If the server responded with a non-2xx status code, it will throw an error
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Could not delete the group.');
      }

      // If the delete was successful, handle the aftermath, like redirecting the user
      alert('Group has been successfully deleted.');
      // Redirect to another page, for example, the dashboard
      // This depends on your routing setup, using useHistory from react-router-dom for example
      // history.push('/dashboard');

    } catch (error) {
      console.error('Failed to delete group:', error);
      alert('Failed to delete group: ' + error.message);
    }
  }
};



  return (
    <Container fluid>
      {/* Group Name and Description */}
      <Row className="mb-3">
        <Col>
          <h2>{groupDetails?.groupname}</h2>
          <p>{groupDetails?.description}</p>
        </Col>
      </Row>

      <Row>
      <Col md={4}>
  <Card>
    <Card.Header>Movie Reviews</Card.Header>
    <Card.Body className="scrollable-list">
      {reviews.map((review) => (
        <Card key={review.reviewid} className="mb-2">
          <Card.Body>
            <Link to={`http://localhost:3000/movie/${review.watchhistory_movieid}`}>              
            <Card.Title>{review.title}</Card.Title>
            </Link>
            <Card.Text>{review.reviewtext}</Card.Text>
            <div className="text-muted">{review.reviewdate}</div>
             <RatingStars rating= {review.rating} />
          </Card.Body>
        </Card>
      ))}
    </Card.Body>
  </Card>
</Col>

<Col md={4}>
    <Card className="chat-card">
      <Card.Header>Chat</Card.Header> 
      <Card.Body className="scrollable-list chat-list">
        {messages.map((message) => (
          <Card key={message.chat_id} className="mb-2">
            <Card.Body>
              <strong>{message.username}:</strong> {message.message_text}
              <div className="chat-timestamp text-muted">{message.timestamp}</div>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
      <Form onSubmit={handleSendMessage} className="chat-form">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Send
        </Button>
      </Form>
    </Card>
  </Col>

  <Col md={4}>
  <Card>
    <Card.Header>Participants</Card.Header>
    <Card.Body className="scrollable-list">
      {participants.map((participant) => (
        <Card key={participant.userid} className="mb-2">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              {participant.username}
              {/* Show the Admin badge and Delete Group button if participant is admin */}
              {participant.is_admin && (
                <>
                  <Badge pill variant="primary" className="ml-2">Admin</Badge>
                  {/* Show Delete Group button only for the logged-in admin user */}
                  {user[0].is_admin && participant.userid === user[0].userid && (
                    <Button 
                      variant="danger" 
                      className="ml-2" // Adjust the class as needed
                      onClick={handleDeleteGroup}
                    >
                      Delete Group
                    </Button>
                  )}
                </>
              )}
            </div>
            {/* Render the "Kick" button for non-admin users */}
            {!participant.is_admin && user[0].is_admin && (
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => kickUser(participant.userid)}
              >
                Kick
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </Card.Body>
  </Card>
</Col>
      </Row>

    </Container>
  );
};


export default GroupPage;