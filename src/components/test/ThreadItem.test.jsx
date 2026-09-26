/**
 * Test scenario for ThreadItem component:
 *
 * - ThreadItem component
 *  - should render thread details correctly
 *  - should call onUpVote callback when upvote button is clicked
 *  - should call onDownVote callback when downvote button is clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from '../ThreadItem';

const fakeThread = {
  id: 'thread-1',
  title: 'Judul Thread Test',
  body: '<p>Ini adalah isi thread test</p>',
  category: 'react',
  createdAt: '2026-03-26T07:00:00.000Z',
  upVotesBy: ['user-1'],
  downVotesBy: [],
  totalComments: 3,
  user: { name: 'Belva' },
  authUser: { id: 'user-1' },
};

describe('ThreadItem component', () => {
  it('should render thread details correctly', () => {
    // Arrange & Action
    render(
      <BrowserRouter>
        <ThreadItem {...fakeThread} />
      </BrowserRouter>
    );

    // Assert
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('Judul Thread Test')).toBeInTheDocument();
    expect(screen.getByText('Ini adalah isi thread test')).toBeInTheDocument();
    expect(screen.getByText('Belva')).toBeInTheDocument();
  });

  it('should call onUpVote callback when upvote button is clicked', async () => {
    // Arrange
    const mockOnUpVote = vi.fn();
    render(
      <BrowserRouter>
        <ThreadItem {...fakeThread} onUpVote={mockOnUpVote} />
      </BrowserRouter>
    );
    const upVoteButton = screen.getAllByRole('button')[0];

    // Action
    await userEvent.click(upVoteButton);

    // Assert
    expect(mockOnUpVote).toHaveBeenCalledWith('thread-1');
  });

  it('should call onDownVote callback when downvote button is clicked', async () => {
    // Arrange
    const mockOnDownVote = vi.fn();
    render(
      <BrowserRouter>
        <ThreadItem {...fakeThread} onDownVote={mockOnDownVote} />
      </BrowserRouter>
    );
    const downVoteButton = screen.getAllByRole('button')[1];

    // Action
    await userEvent.click(downVoteButton);

    // Assert
    expect(mockOnDownVote).toHaveBeenCalledWith('thread-1');
  });
});