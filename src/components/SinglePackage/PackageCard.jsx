import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Accordion from './Accordion';
import Badge from '../ui/badge';
import { calculateHealthScore, getHealthLabel } from '../../utils/statusCalculator';
import { extractGithubUrl } from '../../utils/npmParser';

function PackageCard({ data, downloads }) {
  const latestVersion = data['dist-tags']?.latest || 'unknown';
  const versions = Object.keys(data.versions || {});
  const latestVersionData = data.versions?.[latestVersion] || {};
  const dependencies = latestVersionData.dependencies || {};
  const dependencyCount = Object.keys(dependencies).length;
  
  const healthScore = calculateHealthScore(data, downloads);
  const healthInfo = getHealthLabel(healthScore);
  
  const githubUrl = extractGithubUrl(data.repository);
  
  const lastPublish = data.time?.[latestVersion] || data.time?.modified;
  const lastPublishDate = lastPublish ? new Date(lastPublish).toLocaleDateString() : 'Unknown';
  
  return (
    <Card className="card-brutalist" data-testid="package-card">
      <Card.Header className="card-header-brutalist d-flex justify-content-between align-items-center">
        <span data-testid="package-name">{data.name}</span>
        <Badge status={healthInfo.variant}>
          {healthInfo.label} ({healthScore}/100)
        </Badge>
      </Card.Header>
      <Card.Body>
        {/* Basic Info - Always Visible */}
        <div className="mb-4" data-testid="basic-info">
          <h5 className="mb-3">📋 BASIC INFO</h5>
          <Row className="g-3">
            <Col md={6}>
              <div className="mb-2">
                <strong>Latest Version:</strong>
                <span className="ms-2" data-testid="latest-version">{latestVersion}</span>
              </div>
              <div className="mb-2">
                <strong>License:</strong>
                <span className="ms-2" data-testid="license">{data.license || 'Unknown'}</span>
              </div>
              <div className="mb-2">
                <strong>Author:</strong>
                <span className="ms-2" data-testid="author">
                  {data.author?.name || data.maintainers?.[0]?.name || 'Unknown'}
                </span>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-2">
                <strong>Last Publish:</strong>
                <span className="ms-2" data-testid="last-publish">{lastPublishDate}</span>
              </div>
              <div className="mb-2">
                <strong>Dependencies:</strong>
                <span className="ms-2" data-testid="dependency-count">{dependencyCount}</span>
              </div>
              {data.deprecated && (
                <div className="mb-2">
                  <Badge status="WORST">DEPRECATED</Badge>
                </div>
              )}
            </Col>
          </Row>
          {data.description && (
            <div className="mt-3">
              <p className="mb-0 text-muted" data-testid="description">{data.description}</p>
            </div>
          )}
        </div>
        
        {/* Version History - Expandable */}
        <Accordion title="🔢 VERSION HISTORY" testId="version-history">
          <div>
            <p>
              <strong>Total Versions:</strong> {versions.length}
            </p>
            <p className="mb-0">
              <strong>Available Versions:</strong>
            </p>
            <div className="mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <code className="d-block">
                {versions.slice(-20).reverse().join(', ')}
                {versions.length > 20 && '...'}
              </code>
            </div>
          </div>
        </Accordion>
        
        {/* Download Stats - Expandable */}
        <Accordion title="📊 DOWNLOAD STATS" testId="download-stats">
          {downloads ? (
            <div>
              <p>
                <strong>Last Month:</strong> {downloads.downloads?.toLocaleString() || 0} downloads
              </p>
              <p className="mb-0">
                <strong>Package:</strong> {downloads.package}
              </p>
            </div>
          ) : (
            <p className="mb-0 text-muted">Download data not available</p>
          )}
        </Accordion>
        
        {/* Links - Expandable */}
        <Accordion title="🔗 LINKS" testId="links">
          <div>
            {githubUrl && (
              <div className="mb-2">
                <strong>Repository:</strong>
                <br />
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                  data-testid="github-link"
                >
                  {githubUrl}
                </a>
              </div>
            )}
            {data.homepage && (
              <div className="mb-2">
                <strong>Homepage:</strong>
                <br />
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                  data-testid="homepage-link"
                >
                  {data.homepage}
                </a>
              </div>
            )}
            <div>
              <strong>NPM:</strong>
              <br />
              <a
                href={`https://www.npmjs.com/package/${data.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                data-testid="npm-link"
              >
                https://www.npmjs.com/package/{data.name}
              </a>
            </div>
          </div>
        </Accordion>
        
        {/* Dependencies - Expandable */}
        <Accordion title="📦 DEPENDENCIES" testId="dependencies">
          {dependencyCount > 0 ? (
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <ul className="mb-0">
                {Object.entries(dependencies).map(([dep, version]) => (
                  <li key={dep}>
                    <code>{dep}</code>: {version}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mb-0 text-muted">No dependencies</p>
          )}
        </Accordion>
        
        {/* Keywords - Expandable */}
        {data.keywords && data.keywords.length > 0 && (
          <Accordion title="🏷️ KEYWORDS" testId="keywords">
            <div>
              {data.keywords.map((keyword, idx) => (
                <span key={idx} className="badge bg-secondary me-2 mb-2">
                  {keyword}
                </span>
              ))}
            </div>
          </Accordion>
        )}
      </Card.Body>
    </Card>
  );
}

export default PackageCard;