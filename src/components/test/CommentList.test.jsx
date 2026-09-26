/**
 * Test scenario for CommentList component:
 *
 * - CommentList component
 *  - should render empty message when comments array is empty
 *  - should render comments correctly when provided
 *  - should call voting callbacks when vote buttons are clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentList from '../CommentList';

const fakeComments = [
  {
    id: 'comment-1',
    content: 'Komentar pertama',
    createdAt: '2026-03-26T07:00:00.000Z',
    owner: { name: 'User A', avatar: 'https://avatar.com/a.jpg' },
    upVotesBy: ['user-1'],
    downVotesBy: [],
  },
];

describe('CommentList component', () => {
  it('should render empty message when comments array is empty', () => {
    // Arrange & Action
    render(<CommentList comments={[]} />);

    // Assert
    expect(screen.getByText('Belum ada komentar.')).toBeInTheDocument();
  });

  it('should render comments correctly when provided', () => {
    // Arrange & Action
    render(<CommentList comments={fakeComments} />);

    // Assert
    expect(screen.getByText('Komentar (1)')).toBeInTheDocument();
    expect(screen.getByText('Komentar pertama')).toBeInTheDocument();
    expect(screen.getByText('User A')).toBeInTheDocument();
  });

  it('should call voting callbacks when vote buttons are clicked', async () => {
    // Arrange
    const mockOnUpVote = vi.fn();
    const mockOnDownVote = vi.fn();
    render(
      <CommentList
        comments={fakeComments}
        authUser={{ id: 'user-1' }}
        onUpVoteComment={mockOnUpVote}
        onDownVoteComment={mockOnDownVote}
      />
    );
    const buttons = screen.getAllByRole('button');

    // Action
    await userEvent.click(buttons[0]); // UpVote
    await userEvent.click(buttons[1]); // DownVote

    // Assert
    expect(mockOnUpVote).toHaveBeenCalledWith('comment-1');
    expect(mockOnDownVote).toHaveBeenCalledWith('comment-1');
  });
});