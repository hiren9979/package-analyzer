import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'GOOD', label: 'Good' },
    { key: 'BAD', label: 'Bad' },
    { key: 'WORST', label: 'Worst' },
    { key: 'BEST', label: 'Best' }
  ];
  
  return (
    <div className="mb-4" data-testid="filter-bar">
      <div className="mb-2 fw-bold">FILTER BY STATUS</div>
      <ButtonGroup>
        {filters.map(filter => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? 'dark' : 'outline-dark'}
            onClick={() => onFilterChange(filter.key)}
            className="rounded-0 border-dark"
            data-testid={`filter-${filter.key.toLowerCase()}`}
          >
            {filter.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export default FilterBar;