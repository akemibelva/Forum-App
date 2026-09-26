/**
 * Test scenario for isPreloadReducer:
 *
 * - isPreloadReducer function
 *  - should return the initial state when given unknown action
 *  - should return isPreload status when given SET_IS_PRELOAD action
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from '../reducer';
import { ActionType } from '../action';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return isPreload status when given SET_IS_PRELOAD action', () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(false);
  });
});