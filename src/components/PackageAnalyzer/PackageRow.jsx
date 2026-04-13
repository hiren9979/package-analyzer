import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Badge from '../ui/badge';
import { parseVersion } from '../../utils/semver';

function PackageRow({ package: pkg }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const installedParsed = parseVersion(pkg.installedVersion);
  const latestParsed = parseVersion(pkg.latestVersion);
  
  const upgradeCommand = `npm install ${pkg.name}@latest`;
  
  const lastPublishDate = pkg.lastPublish
    ? new Date(pkg.lastPublish).toLocaleDateString()
    : 'Unknown';
  
  return (
    <Card className="card-brutalist mb-3" data-testid="package-row">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={3}>
            <div className="fw-bold font-monospace" data-testid="package-name">
              {pkg.name}
            </div>
          </Col>
          <Col md={2}>
            <div className="text-muted" data-testid="installed-version">
              {pkg.installedVersion}
            </div>
          </Col>
          <Col md={2}>
            <div className="fw-bold" data-testid="latest-version">
              {pkg.latestVersion}
            </div>
          </Col>
          <Col md={2}>
            <Badge status={pkg.status} />
          </Col>
          <Col md={2}>
            {installedParsed?.clean !== latestParsed?.clean && (
              <div className="text-muted small" data-testid="upgrade-path">
                {installedParsed?.clean} → {latestParsed?.clean}
              </div>
            )}
          </Col>
          <Col md={1} className="text-end">
            <Button
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-dark p-0"
              data-testid="expand-button"
            >
              {isExpanded ? '▲' : '▼'}
            </Button>
          </Col>
        </Row>
        
        {isExpanded && (
          <div className="mt-3 pt-3 border-top border-dark" data-testid="expanded-details">
            <Row>
              <Col md={6}>
                <div className="mb-2">
                  <strong>Description:</strong>
                  <p className="mb-0 text-muted">{pkg.description}</p>
                </div>
                {pkg.license && (
                  <div className="mb-2">
                    <strong>License:</strong> {pkg.license}
                  </div>
                )}
                <div className="mb-2">
                  <strong>Last Publish:</strong> {lastPublishDate}
                </div>
              </Col>
              <Col md={6}>
                {pkg.repository && (
                  <div className="mb-2">
                    <strong>Repository:</strong>
                    <br />
                    <a
                      href={typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      View on GitHub
                    </a>
                  </div>
                )}
                {pkg.homepage && (
                  <div className="mb-2">
                    <strong>Homepage:</strong>
                    <br />
                    <a
                      href={pkg.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {pkg.homepage}
                    </a>
                  </div>
                )}
                <div className="mt-3">
                  <strong>Upgrade Command:</strong>
                  <div className="mt-1">
                    <code className="d-block p-2 bg-light border border-dark">
                      {upgradeCommand}
                    </code>
                  </div>
                </div>
              </Col>
            </Row>
            {pkg.deprecated && (
              <div className="alert alert-danger mt-3 rounded-0 border-dark">
                <strong>DEPRECATED:</strong> {pkg.deprecated}
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default PackageRow;