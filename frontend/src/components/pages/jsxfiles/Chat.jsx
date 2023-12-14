import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const groupId = 10; // The ID of the current group, should be dynamically set

  useEffect(() => {
    // Fetch messages when the component mounts
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/messages/${groupId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault(); // Prevent form submit from refreshing the page
    try {
      const response = await fetch(`/api/messages/${groupId}`, {
        method: 'POST',
        body: JSON.stringify({ message_text: newMessage, user_id: /* Your user's ID */ }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Failed to send the message:', error);
    }
  };

  return (
    <>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>{message.message_text}</div>
        ))}
      </div>
      <Form onSubmit={sendMessage}>
        <Form.Group>
          <Form.Control
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </>
  );
}

export default Chat;