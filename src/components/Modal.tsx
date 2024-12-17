import React, { FC, ReactNode, useEffect } from 'react';

// Define the props for the Modal component
interface ModalProps {
  isOpen: boolean; // Determines if the modal is open
  onClose: () => void; // Callback to handle modal closure
  title?: string; // Optional title for the modal
  children?: ReactNode; // Content to render inside the modal
}

/**
 * Modal Component
 * - A reusable modal component that supports closing via:
 *    1. Clicking the close button.
 *    2. Pressing the Escape key.
 *    3. Clicking outside the modal content.
 */
const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title = 'Modal Title',
  children,
}) => {

    // Add scroll lock when modal opens
  useEffect(() => {
    if (isOpen) {
      // Lock scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure scrolling is restored
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle the Escape key to close the modal
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  // Handle clicks outside the modal content to trigger onClose
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Manage keydown event listener when the modal is open
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Return null if the modal is not open
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-describedby="modal-content"
      aria-labelledby="modal-title"
      style={overlayStyles}
      onClick={handleOutsideClick}
      data-testid="scrim"
    >
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        <header style={headerStyles}>
          <h1 id="modal-title" style={headingStyles}>
            {title}
          </h1>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            style={closeButtonStyles}
          >
            Close
          </button>
        </header>
        <div id="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

// Overlay styles for the modal background
const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
} as React.CSSProperties;

// Modal content styles
const modalStyles = {
  background: '#fff',
  padding: '1.5rem',
  borderRadius: '0.5rem',
  maxWidth: '30rem',
  width: '100%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  position: 'relative',
} as React.CSSProperties;

// Header styles for modal title and close button
const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
} as React.CSSProperties;

// Title styles
const headingStyles = {
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 'bold',
} as React.CSSProperties;

// Close button styles
const closeButtonStyles = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.5rem',
  lineHeight: 1,
  padding: 0,
  color: '#333',
} as React.CSSProperties;
