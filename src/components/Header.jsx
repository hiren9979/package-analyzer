import React from 'react';
import { Container } from 'react-bootstrap';

function Header() {
  return (
    <>
      <div className="hero-section"></div>
      <Container className="content-wrapper py-5">
        <div className="text-center mb-5">
          <div className="mb-3">
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 80 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="logo-main"
            >
              <rect x="10" y="10" width="60" height="60" rx="12" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
              <rect x="20" y="20" width="40" height="40" rx="8" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
              <path d="M30 35L50 35M30 40L50 40M30 45L45 45" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="55" cy="25" r="8" fill="#10B981" stroke="#059669" strokeWidth="2"/>
              <path d="M52 25L54 27L58 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="display-3 mb-3" data-testid="app-title">Package Analyzer</h1>
          <p className="fs-5 text-muted" data-testid="app-tagline">
            Analyze and explore package dependencies
          </p>
        </div>
      </Container>
    </>
  );
}

export default Header;