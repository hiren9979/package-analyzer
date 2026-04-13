import React from 'react';
import { Container } from 'react-bootstrap';

function Header() {
  return (
    <>
      <div className="hero-section"></div>
      <Container className="content-wrapper py-5">
        <div className="text-center mb-5">
          <h1 className="display-3 mb-3" data-testid="app-title">📦 PACKAGE PHOBIA</h1>
          <p className="fs-5 text-muted" data-testid="app-tagline">
            IS YOUR PACKAGE HEALTHY?
          </p>
        </div>
      </Container>
    </>
  );
}

export default Header;