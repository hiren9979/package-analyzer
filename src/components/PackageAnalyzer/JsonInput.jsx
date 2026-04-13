import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

function JsonInput({ onAnalyze }) {
  const [jsonContent, setJsonContent] = useState('');
  const [parseError, setParseError] = useState('');
  const fileInputRef = useRef(null);
  
  const validatePackageJson = (parsed) => {
    // Check if it looks like a package.json
    const hasValidStructure = 
      parsed.dependencies || 
      parsed.devDependencies || 
      parsed.peerDependencies || 
      parsed.optionalDependencies;
    
    if (!hasValidStructure) {
      throw new Error('This does not appear to be a valid package.json file. Please ensure it contains at least one of: dependencies, devDependencies, peerDependencies, or optionalDependencies.');
    }
    
    return true;
  };
  
  const handleAnalyze = () => {
    setParseError('');
    
    if (!jsonContent.trim()) {
      setParseError('Please paste your package.json content or upload a file');
      return;
    }
    
    try {
      const parsed = JSON.parse(jsonContent);
      validatePackageJson(parsed);
      onAnalyze(jsonContent);
    } catch (err) {
      const match = err.message.match(/position (\d+)/);
      const position = match ? parseInt(match[1]) : null;
      
      if (position) {
        const lines = jsonContent.substring(0, position).split('\n');
        setParseError(`Invalid JSON at line ${lines.length}: ${err.message}`);
      } else {
        setParseError(err.message);
      }
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+U or Cmd+U for upload
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        handleUploadClick();
      }
      // Ctrl+Enter or Cmd+Enter for analyze
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleAnalyze();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAnalyze]); // Re-bind when jsonContent changes
  
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setParseError('');
    
    // Check file extension
    if (!file.name.endsWith('.json')) {
      setParseError('Please upload a .json file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setJsonContent(content);
      }
    };
    
    reader.onerror = () => {
      setParseError('Failed to read file');
    };
    
    reader.readAsText(file);
  };
  
  return (
    <div className="mb-4">
      <Form.Group>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Form.Label className="fw-bold mb-0">
            PASTE YOUR PACKAGE.JSON
            <span className="text-muted ms-2" style={{ fontSize: '0.75rem', fontWeight: 400 }}>
              (Ctrl+U to upload, Ctrl+Enter to analyze)
            </span>
          </Form.Label>
          <Button
            variant="outline-dark"
            onClick={handleUploadClick}
            className="rounded-0 border-dark"
            size="sm"
            data-testid="upload-button"
          >
            📁 Upload File
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          data-testid="file-input"
        />
        
        <Form.Control
          as="textarea"
          rows={12}
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
          placeholder={`{
  "name": "my-project",
  "dependencies": {
    "react": "^18.0.0",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}`}
          className="form-control-brutalist font-monospace"
          style={{ fontSize: '0.875rem' }}
          data-testid="json-textarea"
        />
      </Form.Group>
      
      {parseError && (
        <div className="alert alert-danger mt-2 rounded-0 border-dark" data-testid="parse-error">
          {parseError}
        </div>
      )}
      
      <Button
        onClick={handleAnalyze}
        className="btn-brutalist mt-3"
        data-testid="analyze-button"
      >
        Analyze
      </Button>
    </div>
  );
}

export default JsonInput;