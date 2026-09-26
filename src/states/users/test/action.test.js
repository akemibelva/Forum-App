/**
 * Skenario Pengujian Thunk users:
 *
 * - asyncRegisterUser thunk
 *  - harus memanggil api.register dan mengembalikan true ketika registrasi sukses
 *  - harus memunculkan window.alert dan mengembalikan false ketika registrasi gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import { asyncRegisterUser } from '../action';

const fakeRegisterPayload = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
};

const fakeErrorResponse = new Error('Email sudah terdaftar');

describe('Thunk Functions: users/action', () => {
  beforeEach(() => {
    api._register = api.register;
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    api.register = api._register;
    vi.restoreAllMocks();
  });

  it('harus memanggil api.register dan mengembalikan true ketika registrasi sukses', async () => {
    api.register = () => Promise.resolve(fakeRegisterPayload);
    const dispatch = vi.fn();

    const success = await asyncRegisterUser(fakeRegisterPayload)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(success).toBe(true);
  });

  it('harus memunculkan window.alert dan mengembalikan false ketika registrasi gagal', async () => {
    api.register = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    const success = await asyncRegisterUser(fakeRegisterPayload)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(success).toBe(false);
  });
});