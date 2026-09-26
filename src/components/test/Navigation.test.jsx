/**
 * Test scenario for Navigation component:
 *
 * - Navigation component
 *  - should render navigation links and brand correctly
 *  - should display user profile when authUser is provided
 *  - should call onLogout function when logout button is clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

const fakeAuthUser = {
  id: 'user-1',
  name: 'Akemi',
  avatar: 'https://generated-image-url.jpg',
};

describe('Navigation component', () => {
  it('should render navigation links and brand correctly', () => {
    // Arrange & Action
    render(
      <BrowserRouter>
        <Navigation authUser={null} onLogout={() => {}} />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('DICODING FORUM APP')).toBeInTheDocument();
    expect(screen.getByText('Threads')).toBeInTheDocument();
    expect(screen.getByText('Leaderboards')).toBeInTheDocument();
  });

  it('should display user profile when authUser is provided', () => {
    // Arrange & Action
    render(
      <BrowserRouter>
        <Navigation authUser={fakeAuthUser} onLogout={() => {}} />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('Akemi')).toBeInTheDocument();
    expect(screen.getByAltText('Akemi')).toBeInTheDocument();
  });

  it('should call onLogout function when logout button is clicked', async () => {
    // Arrange
    const mockOnLogout = vi.fn();
    render(
      <BrowserRouter>
        <Navigation authUser={fakeAuthUser} onLogout={mockOnLogout} />
      </BrowserRouter>
    );
    const logoutButton = screen.getByTitle('Keluar');

    // Action
    await userEvent.click(logoutButton);

    // Assert
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});