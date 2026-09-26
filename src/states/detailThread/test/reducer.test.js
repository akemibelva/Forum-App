/**
 * Test scenario for detailThreadReducer:
 *
 * - detailThreadReducer function
 *  - should return null when given CLEAR_DETAIL_THREAD action
 *  - should return detailThread when given RECEIVE_DETAIL_THREAD action
 *  - should add comment correctly when given ADD_COMMENT action
 *  - should toggle comment up-vote correctly when given TOGGLE_UP_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import detailThreadReducer from '../reducer';
import { ActionType } from '../action';

describe('detailThreadReducer function', () => {
  it('should return null when given CLEAR_DETAIL_THREAD action', () => {
    // arrange
    const initialState = { id: 'thread-1', title: 'Detail Thread' };
    const action = { type: ActionType.CLEAR_DETAIL_THREAD };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return detailThread when given RECEIVE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = null;
    const detailThread = {
      id: 'thread-1',
      title: 'Judul Thread',
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: { detailThread },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(detailThread);
  });

  it('should add comment correctly when given ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [{ id: 'comment-1', content: 'Komentar awal' }],
    };
    const newComment = { id: 'comment-2', content: 'Komentar baru' };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([newComment, ...initialState.comments]);
  });

  it('should toggle comment up-vote correctly when given TOGGLE_UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          upVotesBy: [],
          downVotesBy: ['user-1'],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toContain('user-1');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
  });
});