/**
 * Skenario Pengujian Thunk authUser:
 *
 * - asyncSetAuthUser thunk
 *  - harus dispatch setAuthUserActionCreator dan menyimpan access token ketika login sukses
 *  - harus memunculkan window.alert ketika login gagal
 *
 * - asyncUnsetAuthUser thunk
 *  - harus dispatch unsetAuthUserActionCreator dan menghapus access token
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from '../action';

const fakeUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
};

const fakeToken = 'fake-token-jwt';
const fakeErrorResponse = new Error('Email atau password salah');

describe('Thunk Functions: authUser/action', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;
    vi.restoreAllMocks();
  });

  describe('asyncSetAuthUser thunk', () => {
    it('harus dispatch setAuthUserActionCreator dan menyimpan access token ketika login sukses', async () => {
      api.login = () => Promise.resolve(fakeToken);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = () => Promise.resolve(fakeUserResponse);
      const dispatch = vi.fn();

      await asyncSetAuthUser({ email: 'john@example.com', password: 'password123' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('harus memunculkan window.alert ketika login gagal', async () => {
      api.login = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();

      await asyncSetAuthUser({ email: 'john@example.com', password: 'wrongpassword' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    it('harus dispatch unsetAuthUserActionCreator dan menghapus access token', () => {
      api.putAccessToken = vi.fn();
      const dispatch = vi.fn();

      asyncUnsetAuthUser()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
    });
  });
});