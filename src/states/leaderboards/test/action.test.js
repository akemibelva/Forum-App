/**
 * Skenario Pengujian Thunk leaderboards:
 *
 * - asyncReceiveLeaderboards thunk
 *  - harus dispatch receiveLeaderboardsActionCreator ketika pemuatan data leaderboard berhasil
 *  - harus memunculkan window.alert ketika pemuatan data leaderboard gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { asyncReceiveLeaderboards, receiveLeaderboardsActionCreator } from '../action';

const fakeLeaderboardsResponse = [
  {
    user: { id: 'user-1', name: 'John Doe' },
    score: 100,
  },
];

const fakeErrorResponse = new Error('Gagal memuat leaderboard');

describe('Thunk Functions: leaderboards/action', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    vi.restoreAllMocks();
  });

  it('harus dispatch receiveLeaderboardsActionCreator ketika pemuatan data leaderboard berhasil', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboardsActionCreator(fakeLeaderboardsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus memunculkan window.alert ketika pemuatan data leaderboard gagal', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    await asyncReceiveLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});