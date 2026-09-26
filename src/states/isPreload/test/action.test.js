/**
 * Skenario Pengujian Thunk isPreload:
 *
 * - asyncPreloadProcess thunk
 *  - harus dispatch setAuthUserActionCreator ketika proses verifikasi token sukses
 *  - harus dispatch setAuthUserActionCreator(null) ketika proses verifikasi token gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from '../action';
import { setAuthUserActionCreator } from '../../authuser/action';

const fakeUserResponse = {
  id: 'user-1',
  name: 'John Doe',
};

describe('Thunk Functions: isPreload/action', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
  });

  it('harus dispatch setAuthUserActionCreator ketika proses verifikasi token sukses', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeUserResponse);
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus dispatch setAuthUserActionCreator(null) ketika proses verifikasi token gagal', async () => {
    api.getOwnProfile = () => Promise.reject(new Error('Token expired'));
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});