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
    fireEvent.click(screen.getByTestId('mockId'));

    // Verify the onClose callback is called once
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});