/**
 * Test scenario for threadsReducer:
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should toggle up-vote thread correctly when given by TOGGLE_UP_VOTE_THREAD action
 *  - should toggle down-vote thread correctly when given by TOGGLE_DOWN_VOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from '../reducer';
import { ActionType } from '../action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Test 1',
            body: 'Body Test 1',
            category: 'redux',
            createdAt: '2026-01-01T00:00:00.000Z',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Lama',
        body: 'Konten lama',
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread Baru',
      body: 'Konten baru',
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should toggle up-vote thread correctly when given by TOGGLE_UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['user-1'], // sebelumnya pernah down-vote
      },
    ];
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: lakukan up-vote
    const nextState = threadsReducer(initialState, action);

    // assert: user-1 harus masuk ke upVotesBy dan terhapus dari downVotesBy
    expect(nextState[0].upVotesBy).toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');

    // action: up-vote kembali (menetralkan vote)
    const neutralizedState = threadsReducer(nextState, action);

    // assert: user-1 harus terhapus dari upVotesBy
    expect(neutralizedState[0].upVotesBy).not.toContain('user-1');
  });

  it('should toggle down-vote thread correctly when given by TOGGLE_DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        upVotesBy: ['user-1'],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: lakukan down-vote
    const nextState = threadsReducer(initialState, action);

    // assert: user-1 harus masuk ke downVotesBy dan terhapus dari upVotesBy
    expect(nextState[0].downVotesBy).toContain('user-1');
    expect(nextState[0].upVotesBy).not.toContain('user-1');
  });
});