import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false);
  
  const shortcuts = [
    { key: 'Enter', description: 'Search package (in search field)', context: 'Single Package' },
    { key: 'Ctrl+U', description: 'Upload package.json file', context: 'Analyzer' },
    { key: 'Ctrl+Enter', description: 'Analyze package.json', context: 'Analyzer' },
  ];
  
  return (
    <>
      <Button
        variant="link"
        onClick={() => setIsVisible(!isVisible)}
        className="text-dark text-decoration-none position-fixed"
        style={{ 
          bottom: '20px', 
          right: '20px', 
          fontSize: '1.5rem',
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          border: '2px solid #0B0B0B',
          borderRadius: 0,
          width: '50px',
          height: '50px',
          padding: 0
        }}
        data-testid="keyboard-shortcuts-toggle"
        title="Keyboard Shortcuts"
      >
        ⌨️
      </Button>
      
      {isVisible && (
        <Card 
          className="card-brutalist position-fixed"
          style={{ 
            bottom: '80px', 
            right: '20px', 
            width: '350px',
            zIndex: 1000
          }}
          data-testid="keyboard-shortcuts-panel"
        >
          <Card.Header className="card-header-brutalist d-flex justify-content-between align-items-center">
            <span>KEYBOARD SHORTCUTS</span>
            <Button
              variant="link"
              onClick={() => setIsVisible(false)}
              className="text-dark p-0"
              style={{ fontSize: '1.2rem', textDecoration: 'none' }}
            >
              ✕
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="font-monospace" style={{ fontSize: '0.875rem' }}>
              {shortcuts.map((shortcut, idx) => (
                <div key={idx} className="mb-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <span className="badge bg-dark rounded-0 me-2">
                      {shortcut.key}
                    </span>
                    <span className="flex-grow-1">{shortcut.description}</span>
                  </div>
                  <div className="text-muted small mt-1">
                    Context: {shortcut.context}
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default KeyboardShortcuts;
