import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
            <Card.Title>{review.title}</Card.Title>
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
              {participant.is_admin && (
                <Badge pill variant="primary" className="ml-2">Admin</Badge>
              )}
            </div>
            {participant.is_admin && (
              <Button variant="outline-danger" size="sm">Kick</Button>
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