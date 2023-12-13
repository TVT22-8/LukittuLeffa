import React from "react";

import { Container, Row, Col, Button, Card } from 'react-bootstrap';


const UserPage = () => {
  return (
    <Container fluid="lg" className="my-4">
      {/* Suggestions Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Suggestions</Card.Header>
            <Card.Body>
              {/* Replace with actual suggestions content */}
              <Button variant="primary">Add movie</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* History Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>History</Card.Header>
            <Card.Body>
              {/* Replace with actual history content */}
              <Button variant="primary">Add movie</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Watchlist Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Watchlist</Card.Header>
            <Card.Body>
              {/* Replace with actual watchlist content */}
              <Button variant="primary">Add movie</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Groups Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Your Groups</Card.Header>
            <Card.Body>
              {/* Replace with actual groups content */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Header>Your Reviews</Card.Header>
            <Card.Body>
              {/* Replace with actual reviews content */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          {/* Side column for latest group reviews, etc. */}
          <Card>
            <Card.Header>Your Group's Latest Reviews</Card.Header>
            <Card.Body>
              {/* Replace with actual latest reviews content */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;