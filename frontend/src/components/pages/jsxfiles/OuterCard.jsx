// OuterCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

const OuterCard = ({ children }) => {
  return (
    <Card style={{ width: '1800px', height: '325px', overflowX: 'auto'}}>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default OuterCard;