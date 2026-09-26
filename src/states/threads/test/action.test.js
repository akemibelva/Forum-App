/**
 * Skenario Pengujian Thunk:
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - harus dispatch action dan loading bar secara tepat ketika pengambilan data berhasil
 *  - harus dispatch action dan memunculkan error window.alert ketika pengambilan data gagal
 *
 * - asyncAddThread thunk
 *  - harus dispatch action addThreadActionCreator dan return true ketika pembuatan thread sukses
 *  - harus memunculkan window.alert dan return false ketika pembuatan thread gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import {
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  receiveThreadsActionCreator,
  addThreadActionCreator,
} from '../action';
import { receiveUsersActionCreator } from '../../users/action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Test',
    body: 'Body Test',
    category: 'test',
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User Test',
    email: 'user@example.com',
  },
];

const fakeErrorResponse = new Error('Terjadi kesalahan koneksi');

describe('Thunk Functions: threads/action', () => {
  beforeEach(() => {
    // Backup implementasi asli
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
    api._createThread = api.createThread;

    // Mock window.alert
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    // Kembalikan implementasi asli
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;
    api.createThread = api._createThread;

    vi.restoreAllMocks();
  });

  describe('asyncPopulateUsersAndThreads thunk', () => {
    it('harus dispatch action dan loading bar secara tepat ketika pengambilan data berhasil', async () => {
      // Arrange
      api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
      const dispatch = vi.fn();

      // Action
      await asyncPopulateUsersAndThreads()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('harus dispatch action dan memunculkan error window.alert ketika pengambilan data gagal', async () => {
      // Arrange
      api.getAllUsers = () => Promise.reject(fakeErrorResponse);
      api.getAllThreads = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();

      // Action
      await asyncPopulateUsersAndThreads()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncAddThread thunk', () => {
    it('harus dispatch action addThreadActionCreator dan return true ketika pembuatan thread sukses', async () => {
      // Arrange
      const newThreadPayload = {
        title: 'Thread Baru',
        body: 'Isi Thread Baru',
        category: 'general',
      };
      const createdThread = { id: 'thread-2', ...newThreadPayload };
      api.createThread = () => Promise.resolve(createdThread);
      const dispatch = vi.fn();

      // Action
      const result = await asyncAddThread(newThreadPayload)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(createdThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toBe(true);
    });

    it('harus memunculkan window.alert dan return false ketika pembuatan thread gagal', async () => {
      // Arrange
      const newThreadPayload = {
        title: 'Thread Baru',
        body: 'Isi Thread Baru',
        category: 'general',
      };
      api.createThread = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();

      // Action
      const result = await asyncAddThread(newThreadPayload)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toBe(false);
    });
  });
});