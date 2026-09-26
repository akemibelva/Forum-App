/**
 * Skenario Pengujian Thunk detailThread:
 *
 * - asyncReceiveDetailThread thunk
 *  - harus dispatch action dan loading bar secara tepat ketika pengambilan detail thread sukses
 *  - harus memunculkan window.alert ketika pengambilan detail thread gagal
 *
 * - asyncAddComment thunk
 *  - harus dispatch action addCommentActionCreator dan return true ketika penambahan komentar sukses
 *  - harus memunculkan window.alert dan return false ketika penambahan komentar gagal
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../../utils/api';
import {
  asyncReceiveDetailThread,
  asyncAddComment,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
} from '../action';

const fakeDetailThreadResponse = {
  id: 'thread-1',
  title: 'Judul Thread',
  body: 'Isi Thread',
  comments: [],
};

const fakeCommentResponse = {
  id: 'comment-1',
  content: 'Ini komentar baru',
};

const fakeErrorResponse = new Error('Gagal memuat data');

describe('Thunk Functions: detailThread/action', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
    api._createComment = api.createComment;
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    api.createComment = api._createComment;
    vi.restoreAllMocks();
  });

  describe('asyncReceiveDetailThread thunk', () => {
    it('harus dispatch action dan loading bar secara tepat ketika pengambilan detail thread sukses', async () => {
      api.getThreadDetail = () => Promise.resolve(fakeDetailThreadResponse);
      const dispatch = vi.fn();

      await asyncReceiveDetailThread('thread-1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator());
      expect(dispatch).toHaveBeenCalledWith(receiveDetailThreadActionCreator(fakeDetailThreadResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('harus memunculkan window.alert ketika pengambilan detail thread gagal', async () => {
      api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();

      await asyncReceiveDetailThread('thread-1')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncAddComment thunk', () => {
    it('harus dispatch action addCommentActionCreator dan return true ketika penambahan komentar sukses', async () => {
      api.createComment = () => Promise.resolve(fakeCommentResponse);
      const dispatch = vi.fn();

      const result = await asyncAddComment({ threadId: 'thread-1', content: 'Ini komentar baru' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeCommentResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toBe(true);
    });

    it('harus memunculkan window.alert dan return false ketika penambahan komentar gagal', async () => {
      api.createComment = () => Promise.reject(fakeErrorResponse);
      const dispatch = vi.fn();

      const result = await asyncAddComment({ threadId: 'thread-1', content: 'Ini komentar baru' })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(result).toBe(false);
    });
  });
});