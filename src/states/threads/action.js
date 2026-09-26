import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Thunk Up-Vote Thread (Optimistic Update)
function asyncToggleVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk melakukan vote!');
      return;
    }

    const userId = authUser.id;
    const thread = threads.find((t) => t.id === threadId);
    const isUpVoted = thread.upVotesBy.includes(userId);

    dispatch(toggleUpVoteThreadActionCreator({ threadId, userId }));
    dispatch(showLoading());

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Thunk Down-Vote Thread (Optimistic Update)
function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk melakukan vote!');
      return;
    }

    const userId = authUser.id;
    const thread = threads.find((t) => t.id === threadId);
    const isDownVoted = thread.downVotesBy.includes(userId);

    dispatch(toggleDownVoteThreadActionCreator({ threadId, userId }));
    dispatch(showLoading());

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  asyncToggleVoteThread,
  asyncToggleDownVoteThread,
};