import React from 'react';
import { Nav } from 'react-bootstrap';

function TabSwitcher({ activeTab, onTabChange }) {
  return (
    <Nav variant="tabs" className="nav-tabs-brutalist mb-4">
      <Nav.Item>
        <Nav.Link
          active={activeTab === 'single'}
          onClick={() => onTabChange('single')}
          data-testid="tab-single-package"
        >
          Single Package
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          active={activeTab === 'analyzer'}
          onClick={() => onTabChange('analyzer')}
          data-testid="tab-package-analyzer"
        >
          Analyze package.json
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default TabSwitcher;