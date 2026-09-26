/**
 * Test scenario for CommentInput component:
 *
 * - CommentInput component
 *  - should handle comment content typing correctly
 *  - should call onAddComment function and clear input when submitted
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from '../CommentInput';

describe('CommentInput component', () => {
  it('should handle comment content typing correctly', async () => {
    // Arrange
    render(<CommentInput onAddComment={() => {}} />);
    const commentInput = screen.getByPlaceholderText('Tulis tanggapanmu...');

    // Action
    await userEvent.type(commentInput, 'Ini komentar percobaan');

    // Assert
    expect(commentInput).toHaveValue('Ini komentar percobaan');
  });

  it('should call onAddComment function and clear input when submitted', async () => {
    // Arrange
    const mockOnAddComment = vi.fn();
    render(<CommentInput onAddComment={mockOnAddComment} />);
    const commentInput = screen.getByPlaceholderText('Tulis tanggapanmu...');
    const submitButton = screen.getByRole('button', { name: 'Kirim Komentar' });

    // Action
    await userEvent.type(commentInput, 'Komentar Saya');
    await userEvent.click(submitButton);

    // Assert
    expect(mockOnAddComment).toHaveBeenCalledWith('Komentar Saya');
    expect(commentInput).toHaveValue('');
  });
});