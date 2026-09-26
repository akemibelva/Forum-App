/**
 * Test scenario for usersReducer:
 *
 * - usersReducer function
 *  - should return the initial state when given unknown action
 *  - should return users when given RECEIVE_USERS action
 */

import { describe, it, expect } from 'vitest';
import usersReducer from '../reducer';
import { ActionType } from '../action';

describe('usersReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return users when given RECEIVE_USERS action', () => {
    // arrange
    const initialState = [];
    const fakeUsers = [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'user-2',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users: fakeUsers,
      },
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(fakeUsers);
  });
});