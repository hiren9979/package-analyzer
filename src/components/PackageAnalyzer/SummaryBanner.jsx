import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function SummaryBanner({ results }) {
  const total = results.length;
  const good = results.filter(r => r.status === 'GOOD').length;
  const bad = results.filter(r => r.status === 'BAD').length;
  const worst = results.filter(r => r.status === 'WORST').length;
  const best = results.filter(r => r.status === 'BEST').length;
  const outdated = bad + worst;
  
  return (
    <Card className="card-brutalist mb-4" data-testid="summary-banner">
      <Card.Body>
        <Row className="text-center g-3">
          <Col xs={6} md={3}>
            <div className="fs-2 fw-bold" data-testid="total-packages">{total}</div>
            <div className="text-muted text-uppercase">Total</div>
          </Col>
          <Col xs={6} md={3}>
            <div className="fs-2 fw-bold text-success" data-testid="good-packages">{good + best}</div>
            <div className="text-muted text-uppercase">Healthy</div>
          </Col>
          <Col xs={6} md={3}>
            <div className="fs-2 fw-bold text-warning" data-testid="outdated-packages">{outdated}</div>
            <div className="text-muted text-uppercase">Outdated</div>
          </Col>
          <Col xs={6} md={3}>
            <div className="fs-2 fw-bold text-danger" data-testid="deprecated-packages">{worst}</div>
            <div className="text-muted text-uppercase">Critical</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default SummaryBanner;