import React from 'react';
import PackageRow from './PackageRow';

function PackageTable({ packages }) {
  if (packages.length === 0) {
    return (
      <div className="text-center text-muted py-5" data-testid="no-packages">
        No packages match the current filter
      </div>
    );
  }
  
  return (
    <div data-testid="package-table">
      {packages.map((pkg, index) => (
        <PackageRow key={pkg.name} package={pkg} index={index} />
      ))}
    </div>
  );
}

export default PackageTable;