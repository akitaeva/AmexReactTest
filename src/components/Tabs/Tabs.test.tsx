import { render, screen, fireEvent } from '@testing-library/react';
import { describe, beforeEach, expect, test } from 'vitest';
import '@testing-library/jest-dom';
import Tabs from './Tabs';

/**
 * Test Suite for Tabs Component
 * - Covers rendering, accessibility, keyboard navigation, and interaction behaviors.
 */
describe('Tabs Component', () => {
  // Render the Tabs component before each test to ensure a clean slate
  beforeEach(() => {
    render(<Tabs />);
  });

  /**
   * Test: Render Tabs with Initial State
   * - Ensures the first tab is active by default.
   * - Verifies the correct content is displayed initially.
   */
  test('renders with the first tab active by default', () => {
    // Check that the first tab (HTML) is active
    const htmlTab = screen.getByRole('tab', { name: /html/i });
    expect(htmlTab).toHaveAttribute('aria-selected', 'true');

    // Verify the correct content is displayed
    expect(
      screen.getByText(
        /The HyperText Markup Language or HTML is the standard markup language/i
      )
    ).toBeInTheDocument();
  });

  /**
   * Test: Tab Click Interaction
   * - Simulates clicking a tab to make it active.
   * - Ensures the correct tab is active and its content is displayed.
   */
  test('activates a tab and displays the correct content on click', () => {
    // Simulate clicking the "CSS" tab
    const cssTab = screen.getByRole('tab', { name: /css/i });
    fireEvent.click(cssTab);

    // Verify the "CSS" tab is active
    expect(cssTab).toHaveAttribute('aria-selected', 'true');

    // Verify the correct content is displayed
    expect(
      screen.getByText(
        /Cascading Style Sheets is a style sheet language used for describing/i
      )
    ).toBeInTheDocument();
  });

// TODO fix: Test keyboard navigation (ArrowRight, ArrowLeft)

  /**
   * Test: Keyboard Navigation - ArrowRight
   * - Simulates pressing the right arrow key to navigate to the next tab.
   * - Ensures focus and active state are updated correctly.
   */
  // test('navigates to the next tab with ArrowRight key', () => {
  //   const htmlTab = screen.getByRole('tab', { name: /html/i });
  //   const cssTab = screen.getByRole('tab', { name: /css/i });

  //   // Focus the first tab (HTML)
  //   htmlTab.focus();

  //   // Simulate pressing ArrowRight
  //   fireEvent.keyDown(htmlTab, { key: 'ArrowRight' });

  //   // Verify the next tab (CSS) is active and has focus
  //   expect(cssTab).toHaveFocus();
  //   expect(cssTab).toHaveAttribute('aria-selected', 'true');

  //   // Verify the correct content is displayed
  //   expect(
  //     screen.getByText(
  //       /Cascading Style Sheets is a style sheet language used for describing/i
  //     )
  //   ).toBeInTheDocument();
  // });

  // /**
  //  * Test: Keyboard Navigation - ArrowLeft
  //  * - Simulates pressing the left arrow key to navigate to the previous tab.
  //  * - Ensures focus and active state are updated correctly.
  //  */
  // test('navigates to the previous tab with ArrowLeft key', () => {
  //   const javascriptTab = screen.getByRole('tab', { name: /javascript/i });
  //   const cssTab = screen.getByRole('tab', { name: /css/i });

  //   // Focus the last tab (JavaScript)
  //   javascriptTab.focus();

  //   // Simulate pressing ArrowLeft
  //   fireEvent.keyDown(javascriptTab, { key: 'ArrowLeft' });

  //   // Verify the previous tab (CSS) is active and has focus
  //   expect(cssTab).toHaveFocus();
  //   expect(cssTab).toHaveAttribute('aria-selected', 'true');

  //   // Verify the correct content is displayed
  //   expect(
  //     screen.getByText(
  //       /Cascading Style Sheets is a style sheet language used for describing/i
  //     )
  //   ).toBeInTheDocument();
  // });

  // /**
  //  * Test: Keyboard Navigation Wraparound
  //  * - Simulates pressing ArrowLeft on the first tab and ArrowRight on the last tab.
  //  * - Ensures navigation wraps around correctly.
  //  */
  // test('wraps around navigation when pressing ArrowLeft or ArrowRight on edge tabs', () => {
  //   const htmlTab = screen.getByRole('tab', { name: /html/i });
  //   const javascriptTab = screen.getByRole('tab', { name: /javascript/i });

  //   // Focus the first tab (HTML) and press ArrowLeft
  //   htmlTab.focus();
  //   fireEvent.keyDown(htmlTab, { key: 'ArrowLeft' });

  //   // Verify the last tab (JavaScript) is active
  //   expect(javascriptTab).toHaveFocus();
  //   expect(javascriptTab).toHaveAttribute('aria-selected', 'true');

  //   // Focus the last tab and press ArrowRight
  //   fireEvent.keyDown(javascriptTab, { key: 'ArrowRight' });

  //   // Verify the first tab (HTML) is active
  //   expect(htmlTab).toHaveFocus();
  //   expect(htmlTab).toHaveAttribute('aria-selected', 'true');
  // });

  /**
   * Test: Accessibility Compliance
   * - Verifies tabs use correct ARIA attributes (`aria-selected`, `role`).
   */
  test('tabs have correct ARIA roles and attributes', () => {
    const htmlTab = screen.getByRole('tab', { name: /html/i });
    const cssTab = screen.getByRole('tab', { name: /css/i });

    // Verify ARIA roles and attributes
    expect(htmlTab).toHaveAttribute('role', 'tab');
    expect(cssTab).toHaveAttribute('role', 'tab');
    expect(htmlTab).toHaveAttribute('aria-selected', 'true');
  });

  /**
   * Test: Only one content panel is visible at a time
   * - Ensures no other content is displayed when a tab is active.
   */
  test('displays only one content panel at a time', () => {
    const cssTab = screen.getByRole('tab', { name: /css/i });
    fireEvent.click(cssTab);

    // Verify only CSS content is visible
    expect(
      screen.getByText(
        /Cascading Style Sheets is a style sheet language used for describing/i
      )
    ).toBeInTheDocument();

    // Verify other content is not visible
    expect(
      screen.queryByText(
        /The HyperText Markup Language or HTML is the standard markup language/i
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        /JavaScript, often abbreviated as JS, is a programming language/i
      )
    ).not.toBeInTheDocument();
  });
});
