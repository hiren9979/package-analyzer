import React from 'react';
import { ProgressBar as BootstrapProgressBar } from 'react-bootstrap';

function ProgressBar({ current, total }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <div className="mb-4" data-testid="progress-bar">
      <div className="d-flex justify-content-between mb-2">
        <span className="fw-bold">ANALYZING PACKAGES</span>
        <span className="font-monospace">{current} / {total}</span>
      </div>
      <BootstrapProgressBar
        now={percentage}
        label={`${percentage}%`}
        className="rounded-0 border border-dark"
        style={{ height: '30px' }}
        data-testid="progress-bar-fill"
      />
    </div>
  );
}

export default ProgressBar;