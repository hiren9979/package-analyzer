import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [packageName, setPackageName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (packageName.trim()) {
      onSearch(packageName.trim());
    }
  };
  
  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Enter package name (e.g., lodash, react, axios) - Press Enter to search"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          className="form-control-brutalist"
          data-testid="search-input"
        />
        <Button
          type="submit"
          className="btn-brutalist"
          data-testid="search-button"
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;