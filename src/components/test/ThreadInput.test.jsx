/**
 * Test scenario for ThreadInput component:
 *
 * - ThreadInput component
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle body typing correctly
 *  - should call onAddThread function with correct payload when form is submitted
 *  - should call onClose function when Batal button or close button is clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from '../ThreadInput';

describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} onClose={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Judul thread...');

    // Action
    await userEvent.type(titleInput, 'Judul Diskusi Baru');

    // Assert
    expect(titleInput).toHaveValue('Judul Diskusi Baru');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} onClose={() => {}} />);
    const categoryInput = screen.getByPlaceholderText('contoh: redux, react (opsional)');

    // Action
    await userEvent.type(categoryInput, 'react');

    // Assert
    expect(categoryInput).toHaveValue('react');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} onClose={() => {}} />);
    const bodyInput = screen.getByPlaceholderText('Apa yang ingin kamu diskusikan?');

    // Action
    await userEvent.type(bodyInput, 'Ini adalah isi diskusi.');

    // Assert
    expect(bodyInput).toHaveValue('Ini adalah isi diskusi.');
  });

  it('should call onAddThread function with correct payload when form is submitted', async () => {
    // Arrange
    const mockOnAddThread = vi.fn();
    render(<ThreadInput onAddThread={mockOnAddThread} onClose={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Judul thread...');
    const categoryInput = screen.getByPlaceholderText('contoh: redux, react (opsional)');
    const bodyInput = screen.getByPlaceholderText('Apa yang ingin kamu diskusikan?');
    const submitButton = screen.getByRole('button', { name: 'Kirim' });

    // Action
    await userEvent.type(titleInput, 'Judul Diskusi');
    await userEvent.type(categoryInput, 'redux');
    await userEvent.type(bodyInput, 'Isi Diskusi Redux');
    await userEvent.click(submitButton);

    // Assert
    expect(mockOnAddThread).toHaveBeenCalledWith({
      title: 'Judul Diskusi',
      category: 'redux',
      body: 'Isi Diskusi Redux',
    });
  });

  it('should call onClose function when Batal button is clicked', async () => {
    // Arrange
    const mockOnClose = vi.fn();
    render(<ThreadInput onAddThread={() => {}} onClose={mockOnClose} />);
    const cancelButton = screen.getByRole('button', { name: 'Batal' });

    // Action
    await userEvent.click(cancelButton);

    // Assert
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});