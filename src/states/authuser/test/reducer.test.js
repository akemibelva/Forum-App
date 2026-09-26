/**
 * Test scenario for authUserReducer:
 *
 * - authUserReducer function
 *  - should return the initial state when given unknown action
 *  - should return authUser when given SET_AUTH_USER action
 *  - should return null when given UNSET_AUTH_USER action
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from '../reducer';
import { ActionType } from '../action';

describe('authUserReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return authUser when given SET_AUTH_USER action', () => {
    const initialState = null;
    const fakeAuthUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: fakeAuthUser,
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(fakeAuthUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});