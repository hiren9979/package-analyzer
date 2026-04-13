import React from 'react';
import { Card } from 'react-bootstrap';

function ErrorCard({ message, title = 'Error' }) {
  return (
    <Card className="card-brutalist border-danger" data-testid="error-card">
      <Card.Header className="card-header-brutalist bg-danger text-white">
        {title}
      </Card.Header>
      <Card.Body>
        <p className="mb-0">{message}</p>
      </Card.Body>
    </Card>
  );
}

export default ErrorCard;