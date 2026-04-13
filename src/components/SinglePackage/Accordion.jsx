import React, { useState } from 'react';
import { Accordion as BootstrapAccordion, Card } from 'react-bootstrap';

function Accordion({ title, children, testId }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <BootstrapAccordion className="accordion-brutalist mb-3" data-testid={testId}>
      <BootstrapAccordion.Item eventKey="0">
        <BootstrapAccordion.Header
          onClick={() => setIsOpen(!isOpen)}
          data-testid={`${testId}-toggle`}
        >
          {title}
        </BootstrapAccordion.Header>
        <BootstrapAccordion.Body data-testid={`${testId}-content`}>
          {children}
        </BootstrapAccordion.Body>
      </BootstrapAccordion.Item>
    </BootstrapAccordion>
  );
}

export default Accordion;