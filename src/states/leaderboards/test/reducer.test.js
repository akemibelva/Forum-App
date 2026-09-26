/**
 * Test scenario for leaderboardsReducer:
 *
 * - leaderboardsReducer function
 *  - should return the initial state when given unknown action
 *  - should return leaderboards when given RECEIVE_LEADERBOARDS action
 */

import { describe, it, expect } from 'vitest';
import leaderboardsReducer from '../reducer';
import { ActionType } from '../action';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return leaderboards when given RECEIVE_LEADERBOARDS action', () => {
    const initialState = [];
    const fakeLeaderboards = [
      {
        user: { id: 'user-1', name: 'User Satu' },
        score: 100,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards: fakeLeaderboards,
      },
    };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(fakeLeaderboards);
  });
});