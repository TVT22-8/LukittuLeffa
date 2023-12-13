import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useAuth } from './jsxfiles/Logging'; // Make sure the path is correct
import { use } from "../../../../lukittunode/src/routes";

const UserPage = () => {
  const { user, logout } = useAuth();
  const [watchList, setWatchList] = useState([]);
  const navigate =useNavigate();
  
  // Fetch Watchlist using the authenticated user's information
  useEffect(() => {
    if (user) {
      async function fetchWatchList() {
        try {
          const response = await fetch(`http://localhost:3002/db/users/watchlist/${user.userId}`);
          if (response.ok) {
            const data = await response.json();
            setWatchList(data);
          } else {
            throw new Error('Network response was not ok.');
          }
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      }

      fetchWatchList();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <Container fluid="lg" className="my-4">
      {/* User Greeting Section */}
      <Row className="mb-3">
        <Col>
          <h1>Welcome, {user.username}</h1>
          <Button variant="secondary" onClick={logout}>Logout</Button>
        </Col>
      </Row>

      {/* Suggestions Section */}
      {/* ... rest of the component ... */}
    </Container>
  );
};

export default UserPage;