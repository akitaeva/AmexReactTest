import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Modal from './Modal';

/**
 * Test Suite for Modal Component
 * - Covers rendering, accessibility, and interaction behaviors.
 */
describe('Modal', () => {
  // Mock function to simulate the onClose callback
  const mockClose = vi.fn();

  // Reset the mock function before each test to ensure a clean slate
  beforeEach(() => {
    mockClose.mockReset();
  });

  /**
   * Test: Render Modal with Expected Controls
   * - Ensures that the modal renders with the required elements:
   *   1. Dialog (role: dialog)
   *   2. Heading (role: heading)
   *   3. Close button (role: button, labeled 'Close')
   */
  test('renders modal with expected controls', () => {
    render(
      <Modal isOpen={true} onClose={mockClose}>
        Content
      </Modal>
    );

    // Check that the modal dialog is present in the document
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Verify the heading exists in the modal
    expect(screen.getByRole('heading')).toBeInTheDocument();

    // Ensure the close button is rendered and accessible
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  /**
   * Test: Close Modal on Escape Key
   * - Simulates pressing the 'Escape' key to trigger the onClose callback.
   * - Ensures the callback is invoked exactly once.
   */
  test('calls onClose action when pressing the ESC key', () => {
    render(
      <Modal isOpen={true} onClose={mockClose}>
        Content
      </Modal>
    );

    // Simulate the Escape key press
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    // Ensure the onClose callback is called once
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Close Modal on Dismiss Button Click
   * - Simulates clicking the close button.
   * - Ensures the onClose callback is invoked exactly once.
   */
  test('calls onClose action when clicking the dismiss button', () => {
    render(
      <Modal isOpen={true} onClose={mockClose}>
        Content
      </Modal>
    );

    // Simulate clicking the close button
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    // Verify the onClose callback is called once
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: Close Modal on Outside Click
   * - Simulates clicking outside the modal content area.
   * - Ensures the onClose callback is invoked exactly once.
   */
  test('calls onClose action when clicking outside of the modal', () => {
    render(
      <Modal isOpen={true} onClose={mockClose}>
        Content
      </Modal>
    );

    // Simulate clicking outside the modal (scrim area)
    fireEvent.click(screen.getByTestId('scrim'));

    // Verify the onClose callback is called once
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  // TODO: Conditional rendering based on isOpen prop
  test('does not render when isOpen is false', () => {});


  // Ensure the modal is ARIA-compliant for screen readers.
  test('has proper aria-labelledby and aria-describedby attributes', () => {
    render(
      <Modal isOpen={true} onClose={mockClose}>
        Content
      </Modal>
    );

    // Verify that the modal has proper aria-labelledby and aria-describedby attributes
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby','modal-title');
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-describedby', 'modal-content');
  });


  // When the modal is open, the page content behind it should not scroll.
  test('locks scrolling on the body when modal is open', () => {
    render(
      <Modal isOpen={true} onClose={mockClose}>
        Content
      </Modal>
    );
  
    // Verify body scrolling is locked
    expect(document.body.style.overflow).toBe('hidden');
  });
  
  test('restores body scroll when modal closes', () => {
    const { rerender } = render(      
    <>
      <Modal isOpen={true} onClose={mockClose}>
        <div>Content</div>
      </Modal>
    </> );

     // Close the modal
    rerender(    
    <>
      <Modal isOpen={false} onClose={mockClose}>
        <div>Content</div>
      </Modal>
    </>);

    // Verify body scrolling is restored
    expect(document.body.style.overflow).toBe('');
  });

  // Support for rendering multiple modals
  test('supports multiple modals rendered at the same time', () => {
    render(
      <>
        <Modal isOpen={true} onClose={mockClose}>
          <div>Content 1</div>
        </Modal>
        <Modal isOpen={true} onClose={mockClose}>
          Content 2
        </Modal>
      </>
    );

     // Verify that both modals are rendered
    const modals = screen.getAllByRole('dialog');
    expect(modals).toHaveLength(2);

    // Verify that both modals have expected content
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});



